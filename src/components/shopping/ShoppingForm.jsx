import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Select from "react-select";
import { countryAlpha2Codes } from "helper/countryAlpha2Codes";

const ShoppingForm = props => {
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
          setFieldTouched("image", true, true);

          setValue("image", URL.createObjectURL(fileObj));
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
            Store Logo <span className="asterisk">*</span>
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
          {(uploadImage || values.image) && (
            <img
              src={uploadImage ? uploadImage : values.image}
              alt=""
              className="mtb-15"
              style={{
                width: "200px",
                borderRadius: "4%",
                height: "150px",
                background: "#404040"
              }}
            />
          )}
          <Error field="image" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Store Name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Store Name"
          />
          <Error field="name" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Country <span className="asterisk">*</span>
          </label>
          <Select
            name="country"
            id="country"
            value={
              values.country
                ? countryAlpha2Codes.find(
                    el => el.value === values.country.value
                  )
                : null
            }
            placeholder="Select Country"
            onChange={data => {
              setFieldValue("country", data);
            }}
            onBlur={handleBlur}
            options={countryAlpha2Codes}
          />
          <Error field="country" />
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

export default compose(enhancer)(ShoppingForm);
