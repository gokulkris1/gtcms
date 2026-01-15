import React, { useEffect, useRef, useState } from "react";
import { compose } from "redux";
import formikEnhancer from "./validator";
import { ButtonGroup, Button as RButton } from "reactstrap";
import Select from "react-select";
import clsx from "clsx";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import Button from "components/button/Button";

const GivePointsModal = ({ data = null, onClose, isDeletePoint, ...props }) => {
  const {
    handleBlur,
    errors,
    touched,
    submitCount,
    values,
    setFieldValue,
    handleChange,
    setFieldError
  } = props;

  const toaster = useRef(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMaxError, setIsMaxError] = useState(null);

  useEffect(() => {
    if (!data) {
      Api.post(`/admin/point/userList`, {}).then(res => {
        setUsersList(res.data.data);
      });
    } else {
      setFieldValue("users", [data]);
      setFieldValue("type", "BY_USER");
    }
  }, [data]);

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
    let { values, isValid, handleSubmit, errors } = props;
    if (isValid && !isMaxError) {
      const ids = [];
      if (values.type === "BY_USER") {
        values.users.forEach(el => {
          ids.push(el.value);
        });
      }
      const params = {
        points: values.points,
        userIds: values.type === "ALL" ? [0] : !data ? ids : [data?.userId]
      };

      if (!isDeletePoint) {
        params.giveAwayType = values.type;
      } else {
        params.removePointType = values.type;
      }

      setLoading(true);
      Api.post(
        `/admin/point/${isDeletePoint ? "removePoints" : "givePoints"}`,
        params
      )
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setLoading(false);
            setTimeout(() => {
              onClose();
            }, 500);
          } else {
            if (toaster.current) toaster.current.error(response.data.message);
            setLoading(false);
          }
        })
        .catch(error => {
          if (toaster.current) toaster.current.error(error);
          setLoading(false);
        });
    }
    handleSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="fs-16 medium-text pr-12">
            Type <span className="asterisk">*</span>
          </label>
          {!data ? (
            <ButtonGroup>
              <RButton
                color="secondary"
                outline
                onClick={() => setFieldValue("type", "ALL")}
                active={values?.type === "ALL"}
              >
                ALL
              </RButton>
              <RButton
                color="secondary"
                outline
                onClick={() => setFieldValue("type", "BY_USER")}
                active={values?.type === "BY_USER"}
              >
                BY USER
              </RButton>
            </ButtonGroup>
          ) : (
            <>BY USER</>
          )}
        </div>

        {values.type === "BY_USER" && !data && (
          <div className="form-group">
            <label className="fs-16 medium-text">
              Users <span className="asterisk">*</span>
            </label>
            <Select
              name="Users"
              id="users"
              placeholder="Select Users"
              value={values.users}
              isMulti
              onChange={data => {
                setFieldValue("users", data);
              }}
              onBlur={handleBlur}
              options={
                usersList.length > 0
                  ? usersList.map(result => {
                      return {
                        label: `${result.email}(${result.firstName} ${
                          result.lastName ? result.lastName : ""
                        })`,
                        value: result.userId
                      };
                    })
                  : []
              }
              styles={{
                container: styles => ({
                  ...styles,
                  zIndex: 999
                })
              }}
            />
            <Error field="users" />
          </div>
        )}
        <div className="form-group">
          <label className="fs-16 medium-text">
            Points
            <span className="asterisk">*</span>
          </label>
          <input
            type="number"
            className="form-control react-form-input"
            id="points"
            onChange={e => {
              setIsMaxError(null);

              if (e.target.value > data?.userTotalPoint && isDeletePoint)
                setIsMaxError(`Max point should be ${data?.userTotalPoint}`);

              handleChange(e);
            }}
            onBlur={handleBlur}
            value={values.points}
            placeholder="Points"
          />
          <Error field="points" />
          {isMaxError ? (
            <span className={props.class ? props.class : "error-msg"}>
              {isMaxError}
            </span>
          ) : null}
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className={clsx("c-btn form-button fs-16 demi-bold-text mr-15")}
          dataStyle="expand-right"
          style={{ maxWidth: "125px" }}
        >
          Submit
        </Button>
      </form>
      <Toaster ref={toaster} />
    </div>
  );
};

export default compose(formikEnhancer)(GivePointsModal);
