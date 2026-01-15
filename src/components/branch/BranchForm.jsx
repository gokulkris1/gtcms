import Api from "api/Api";
import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { Input } from "reactstrap";
import { compose } from "redux";
import enhancer from "./validator";

const BranchForm = props => {
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
    isStore,
    storeId,
    storeName
  } = props;

  const [storeList, setstoreList] = useState([]);

  useEffect(() => {
    Api.post("/admin/store/storeList", {}).then(res => {
      setstoreList(res.data.data);
    });
  }, []);

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
            Branch Name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="branchName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.branchName}
            placeholder="Branch Name"
          />
          <Error field="branchName" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Store <span className="asterisk">*</span>
          </label>
          <Input
            type="select"
            name="storeName"
            id="storeName"
            value={values.storeName}
            placeholder="Store"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isStore}
          >
            <option>Select store</option>
            {storeList.length > 0 &&
              storeList.map(result => {
                return (
                  <option value={result.storeId}>{result.storeName}</option>
                );
              })}
          </Input>
          <Error field="storeName" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Address <span className="asterisk">*</span>
          </label>
          <textarea
            className="form-control react-form-input"
            id="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            placeholder="Address"
          />
          <Error field="address" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            City <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            placeholder="City"
          />
          <Error field="city" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            State <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="state"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.state}
            placeholder="State"
          />
          <Error field="state" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Country <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
            placeholder="Country"
          />
          <Error field="country" />
        </div>
        <div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
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

export default compose(enhancer)(BranchForm);
