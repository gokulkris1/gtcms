import Button from "components/button/Button";
import React, { useEffect, useState } from "react";

import { compose } from "redux";
import enhancer from "./validator";

const BrandForm = props => {
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

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    if (editedData) {
      setFieldValue("brandLogos", null);
      setImageData(editedData && editedData.brandImages);
      setFieldValue("brandImages", editedData && editedData.brandImages);
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

  const imageHandler = e => {
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let fileObj = e.target.files[i];
        if (fileObj) {
          const img = new Image();

          img.src = window.URL.createObjectURL(fileObj);

          img.onload = function() {
            window.URL.revokeObjectURL(img.src);
            setFieldValue("isImageValid", true);

            // ImageArray.push(fileObj);
            let data = imageData;
            data.push(fileObj);
            setFieldValue("brandImages", data);
            setImageData([...data]);
          };
        }
      }
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
          window.URL.revokeObjectURL(img.src);

          setFieldTouched("brandLogo", true, true);
          setValue("brandLogo", URL.createObjectURL(fileObj));
          setValue("brandLogos", fileObj);
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
            Brand Name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="brandName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.brandName}
            placeholder="Brand Name"
          />
          <Error field="brandName" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Brand Logo <span className="asterisk">*</span>
          </label>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload logo
              <input
                id="brandLogo"
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
          {(uploadImage || values.brandLogo) && (
            <img
              src={uploadImage ? uploadImage : values.brandLogo}
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
          <Error field="brandLogo" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Brand Images <span className="asterisk">*</span>
          </label>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload Brand Images
              <input
                id="brandImages"
                className="file-upload__input"
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg"
                onChange={e => imageHandler(e)}
                multiple
                onBlur={handleBlur}
              />
            </label>
          </div>
          <Error field="brandImages" />
        </div>
        <div className="Image-Grid mb-4">
          {imageData.map(result => {
            return (
              <div className="deleteImagebtn pos-relative">
                <div className="button-style">
                  <i
                    className="fa fa-times-circle"
                    onClick={e => {
                      e.preventDefault();
                      let data = imageData;
                      data.splice([data.indexOf(result)], 1);
                      setImageData([...data]);
                      setFieldValue("brandImages", data);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      border: "none"
                    }}
                  />
                </div>
                <img
                  alt="loading"
                  src={
                    result instanceof File
                      ? URL.createObjectURL(result)
                      : result
                  }
                  className="Image"
                  style={{
                    width: "320px",
                    borderRadius: "4%",
                    height: "180px",
                    background: "#404040"
                  }}
                />
              </div>
            );
          })}
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

export default compose(enhancer)(BrandForm);
