import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import DatePicker from "react-datepicker";
import moment from "moment";

const RewardsForm = props => {
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
    setFieldTouched,
    setFieldValue,
    editedData
  } = props;

  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    if (editedData) {
      setFieldValue("images", null);
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

  const handleImage = (e, setValue) => {
    if (e.target.files[0]) {
      let fileObj = e.target.files[0];
      // setImageObj(fileObj);
      if (fileObj) {
        const img = new Image();

        img.src = window.URL.createObjectURL(fileObj);

        img.onload = function() {
          const width = img.naturalWidth,
            height = img.naturalHeight;

          window.URL.revokeObjectURL(img.src);
          setValue("width", width);
          setValue("height", height);
          setFieldTouched("voucherImage", true, true);

          setValue("voucherImage", URL.createObjectURL(fileObj));
          setValue("images", fileObj);
          setUploadImage(URL.createObjectURL(fileObj));
        };
      } else {
        //No file was input or browser doesn't support client side reading
        // form.submit();
      }
    } else {
      setUploadImage(null);
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
            Voucher Image <span className="asterisk">*</span>
          </label>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload logo
              <input
                id="image"
                className="file-upload__input"
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg"
                onChange={e => handleImage(e, setFieldValue)}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {(uploadImage || values.voucherImage) && (
            <img
              src={uploadImage ? uploadImage : values.voucherImage}
              alt=""
              className="mtb-15"
              style={{
                width: "280px",
                borderRadius: "4%",
                height: "150px",
                background: "#404040"
              }}
            />
          )}
          <Error field="voucherImage" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Voucher Code <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="voucherCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.voucherCode}
            placeholder="Voucher Code"
          />
          <Error field="voucherCode" />
        </div>
        <div className="flex flex-column form-group">
          <label className="fs-16 medium-text">
            Expiry Date <span className="asterisk">*</span>
          </label>
          <DatePicker
            name="expiryDate"
            minDate={moment().toDate()}
            selected={values.expiryDate ? new Date(values.expiryDate) : null}
            onChange={date => {
              setFieldValue("expiryDate", date);
            }}
            startDate={values.expiryDate}
            onBlur={handleBlur}
            className="form-control"
            placeholderText="Select Expiry Date"
            showYearDropdown
            showMonthDropdown
          />
          <Error field="expiryDate" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Description</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="desc"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.desc}
            placeholder="Description"
          />
          <Error field="desc" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Store Name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="storeName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.storeName}
            placeholder="Store Name"
          />
          <Error field="storeName" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Link <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="link"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.link}
            placeholder="Link"
          />
          <Error field="link" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Amount <span className="asterisk">*</span>
          </label>
          <input
            type="number"
            className="form-control react-form-input"
            id="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            placeholder="Amount"
          />
          <Error field="amount" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Points <span className="asterisk">*</span>
          </label>
          <input
            type="number"
            className="form-control react-form-input"
            id="points"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.points}
            placeholder="Points"
          />
          <Error field="points" />
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

export default compose(enhancer)(RewardsForm);
