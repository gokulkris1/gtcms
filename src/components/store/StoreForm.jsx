import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { Input } from "reactstrap";
import { compose } from "redux";
import enhancer from "./validator";

const StoreForm = props => {
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
  const [uploadAdvertisementImage, setUploadAdvertisementImage] = useState(
    null
  );

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

  const handleAdvertisementImage = (e, setValue) => {
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
          setFieldTouched("advertisementImage", true, true);

          setValue("advertisementImage", URL.createObjectURL(fileObj));
          setValue("advertisementImages", fileObj);
          setUploadAdvertisementImage(URL.createObjectURL(fileObj));
        };
      } else {
        //No file was input or browser doesn't support client side reading
        // form.submit();
      }
    } else {
      setUploadAdvertisementImage(null);
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
          <label className="fs-16 medium-text">Is Active</label>
          <Input
            type="select"
            id="isActive"
            className="form-control react-form-input"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.isActive}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </Input>
          <Error field="isActive" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Twitter Link</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="twitterLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.twitterLink}
            placeholder="Twitter Link"
          />
          <Error field="twitterLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">Google Link</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="googleLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.googleLink}
            placeholder="Google link"
          />
          <Error field="googleLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">Facebook Link</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="facebookLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.facebookLink}
            placeholder="Facebook Link"
          />
          <Error field="facebookLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">Appstore Link</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="appstoreLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.appstoreLink}
            placeholder="Appstore Link"
          />
          <Error field="appstoreLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">Playstore Link</label>
          <input
            type="text"
            className="form-control react-form-input"
            id="playstoreLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.playstoreLink}
            placeholder="PlayStore Link"
          />
          <Error field="playstoreLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Advertisement Image Link <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="advertisementImageLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.advertisementImageLink}
            placeholder="Advertisement Image Link"
          />
          <Error field="advertisementImageLink" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Advertisement Image <span className="asterisk">*</span>
          </label>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload Image
              <input
                id="image"
                className="file-upload__input"
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg"
                onChange={e => handleAdvertisementImage(e, setFieldValue)}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {(uploadAdvertisementImage || values.advertisementImage) && (
            <img
              src={
                uploadAdvertisementImage
                  ? uploadAdvertisementImage
                  : values.advertisementImage
              }
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
          <Error field="advertisementImage" />
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

export default compose(enhancer)(StoreForm);
