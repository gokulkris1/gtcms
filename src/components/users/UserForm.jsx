import Api from "api/Api";
import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Select from "react-select";

const UserForm = props => {
  const {
    handleChange,
    handleBlur,
    errors,
    loading,
    touched,
    submitCount,
    onSubmit,
    values,
    action,
    setFieldValue,
    editedData,
    isStore,
    storeId,
    storeName,
    branchCount
  } = props;

  const [storeList, setstoreList] = useState([]);
  const [BranchList, setBranchList] = useState([]);

  useEffect(() => {
    Api.post("/admin/store/storeList", {}).then(res => {
      setstoreList(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (isStore || values?.branch) {
      Api.post(`/admin/branch/store/list?storeId=${storeId}`).then(res => {
        setBranchList(res.data.data);
      });
    }
  }, [isStore, storeId, values]);

  useEffect(() => {
    if (editedData) {
      Api.post("/admin/branch/store/list", {
        storeId: editedData && editedData.storeId
      }).then(res => {
        setBranchList(res.data.data.list);
        setFieldValue("branch", {
          label: editedData && editedData.branchName,
          value: editedData && editedData.branchId
        });
      });
    }
  }, [editedData]);

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let { values, isValid, handleSubmit } = props;
    if (isValid) {
      onSubmit(values, action);
    }
    handleSubmit();
  };

  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label className="fs-16 medium-text">
            Email <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email"
            disabled={action === "edit"}
          />
          <Error field="email" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Password <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
          />
          <Error field="password" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Confirm Password <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            placeholder="Confirm Password"
          />
          <Error field="confirmPassword" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Store <span className="asterisk">*</span>
          </label>
          <Select
            name="storeName"
            id="storeName"
            isDisabled={isStore}
            value={values.storeName}
            placeholder="Select Store"
            onChange={data => {
              setFieldValue("storeName", data);
              setFieldValue("branch", "");
              Api.post(`/admin/branch/store/list?storeId=${data.value}`).then(
                res => {
                  setBranchList(res.data.data);
                }
              );
            }}
            onBlur={handleBlur}
            options={
              storeList.length > 0
                ? storeList.map(result => {
                    return {
                      label: result.storeName,
                      value: result.storeId
                    };
                  })
                : []
            }
          />
          <Error field="storeName" />
        </div>
        {(BranchList.length > 0 || values.branch) && (
          <div className="form-group">
            <label className="fs-16 medium-text">
              Branch <span className="asterisk">*</span>
            </label>
            <Select
              name="branch"
              id="branch"
              value={values.branch}
              placeholder="Select Branch"
              onChange={data => {
                setFieldValue("branch", data);
              }}
              onBlur={handleBlur}
              options={
                BranchList.length > 0
                  ? BranchList.map(result => {
                      return {
                        label: result.branchName,
                        value: result.branchId
                      };
                    })
                  : []
              }
            />
            <Error field="branch" />
          </div>
        )}
        {!isStore && values.storeName && !BranchList.length && (
          <div className="mb-12 text-info">
            Note: First add a Branch for the selected Store{" "}
          </div>
        )}
        {/* {isStore && branchCount === 0 && !BranchList.length && ( */}
        {isStore && branchCount === 0 && (
          <div>
            <Button
              className="c-btn mb-12"
              onClick={() => props.history.push("/store/branch/add")}
              style={{
                backgroundColor: "#4CBB17",
                color: "#fff"
              }}
            >
              <i className="fas fa-plus mr-10"></i>Add Branch
            </Button>
          </div>
        )}
        <div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || (isStore && branchCount === 0)}
            className="c-btn c-info form-button fs-16 demi-bold-text mr-15"
            style={{ maxWidth: "125px" }}
            dataStyle="expand-right"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default compose(enhancer)(UserForm);
