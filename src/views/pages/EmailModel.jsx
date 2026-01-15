import React, { useRef, useState } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Api from "api/Api";
import Toaster from "components/common/Toaster";

function EmailModel(props) {
  let {
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    receiptName
  } = props;

  const toaster = useRef(null);
  const [loader, setLoader] = useState(false);

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span
          className={props.class ? props.class : "error-msg"}
          style={props.style}
        >
          {errors[field1]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    let { values, isValid, handleSubmit } = props;
    if (isValid) {
      props.setEmail(values.email);
      setLoader(true);
      Api.post("user/submitEmail", {
        email: values.email,
        receiptName: receiptName
      })
        .then(res => {
          if (res.data.status) {
            if (toaster.current) toaster.current.success(res.data.message);
            setTimeout(() => {
              props.toggle();
            }, 1000);
          } else {
            if (toaster.current) toaster.current.error(res.data.message);
          }
          setLoader(false);
        })
        .catch(err => {
          setLoader(false);
          if (toaster.current) toaster.current.error(err.message);
        });
    }
    handleSubmit();
  };

  return (
    <div>
      <div className="text-center">
        <b>Please enter your email address to get the digital receipt.</b>
      </div>
      <form className="mt-20" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="fs-16 medium-text">Email</label>
          <input
            type="email"
            className="form-control react-form-input"
            name="email"
            id="exampleEmail"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />
          <Error field="email" />
        </div>
        <div className="form-group" style={{ position: "relative" }}>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label
              htmlFor="checkbox"
              style={{
                position: "absolute",
                left: "20px",
                color: "#7D7D7D",
                fontSize: "14px"
              }}
            >
              I agree to Green Till's digital receipt{" "}
              <b>Terms and Conditions.</b>
            </label>
          </div>
        </div>
        <Error field="checkbox" />
        <div className="text-center">
          <button
            type="submit"
            className="c-btn form-button fs-16 demi-bold-text"
            style={{
              background: "#4CBB17",
              border: "none",
              padding: "7px 50px",
              marginTop: "20px",
              height: 32
            }}
          >
            {loader ? (
              <div className="lds-ring loder-middle1">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <Toaster ref={toaster} />
    </div>
  );
}

export default compose(enhancer)(EmailModel);
