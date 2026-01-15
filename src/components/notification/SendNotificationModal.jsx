import React, { useEffect, useRef, useState } from "react";
import { compose } from "redux";
import formikEnhancer from "./sendNotificationValidator";
import { ButtonGroup, Button as RButton } from "reactstrap";
import Select from "react-select";
import clsx from "clsx";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import Button from "components/button/Button";

const SendNotificationModal = ({
  data = null,
  onClose,
  isDeletePoint = false,
  ...props
}) => {
  const {
    handleBlur,
    errors,
    touched,
    submitCount,
    values,
    setFieldValue
  } = props;

  const toaster = useRef(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Api.post(`/admin/point/userList`, {}).then(res => {
      setUsersList(res.data.data);
    });
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
    let { values, isValid, handleSubmit } = props;
    if (isValid) {
      const ids = [];
      if (values.type === "BY_USER") {
        values.users.forEach(el => {
          ids.push(el.value);
        });
      }
      const params = {
        notificationId: data?.notificationId,
        userIds: values.type === "ALL" ? undefined : ids,
        sendNotificationType: values.type
      };

      setLoading(true);
      Api.post(`/admin/notification/sendNotification`, params)
        .then(res => {
          if (res.data.status) {
            if (toaster.current) toaster.current.success(res.data.message);
            setTimeout(() => {
              onClose();
            }, 500);
          } else {
            if (toaster.current) toaster.current.error(res.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error.message);
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
          <ButtonGroup>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("type", "BY_USER")}
              active={values?.type === "BY_USER"}
            >
              BY USER
            </RButton>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("type", "ALL")}
              active={values?.type === "ALL"}
            >
              ALL
            </RButton>
          </ButtonGroup>
        </div>

        {values.type === "BY_USER" && (
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

export default compose(formikEnhancer)(SendNotificationModal);
