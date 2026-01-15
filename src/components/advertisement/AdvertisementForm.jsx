import Api from "api/Api";
import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Select from "react-select";
import { ButtonGroup, Button as RButton } from "reactstrap";
import { FieldArray } from "formik";
import clsx from "clsx";

// let ImageArray = [];

const AdvertisementForm = props => {
  const {
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
    branchCount,
    deviceCount,
    handleChange,
    banners
  } = props;

  const [deviceList, setDeviceList] = useState([]);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    if (isStore) {
      Api.post(`/admin/store/devicelist?storeId=${storeId}`, {}).then(res => {
        setDeviceList(res.data.data);
      });
    } else {
      Api.get("/admin/device/deviceList", {}).then(res => {
        setDeviceList(res.data.data);
      });
    }
  }, [isStore, storeId]);

  // useEffect(() => {
  //   if (editedData?.bannersResDTOSet) {
  //     const images = [];
  //     editedData.bannersResDTOSet.map((data) => images.push(data.bannerImage));
  //     setImageData([...images]);
  //   }
  // }, [editedData]);

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
            const width = img.naturalWidth,
              height = img.naturalHeight;

            window.URL.revokeObjectURL(img.src);

            setFieldValue("isImageValid", true);
            // ImageArray.push(fileObj);
            let data = imageData;
            data.push(fileObj);
            setFieldValue("banner", data);
            setImageData([...data]);
          };
        }
      }
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
            Device <span className="asterisk">*</span>
          </label>
          <Select
            name="device"
            id="device"
            isDisabled={editedData ? true : false}
            placeholder="Select Device"
            value={values.device}
            isMulti
            onChange={data => {
              setFieldValue("device", data);
            }}
            onBlur={handleBlur}
            options={
              deviceList.length > 0
                ? deviceList.map(result => {
                    return {
                      label: (
                        <div>{`${result.email}(${result.storeName ??
                          "-"} - ${result.branchName ?? "-"})`}</div>
                      ),
                      value: result.email,
                      id: result.deviceTokenId
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
          <Error field="device" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text pr-12">
            File type <span className="asterisk">*</span>
          </label>
          <ButtonGroup>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("fileType", "IMAGE")}
              active={values?.fileType === "IMAGE"}
            >
              IMAGE
            </RButton>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("fileType", "TEXT")}
              active={values?.fileType === "TEXT"}
            >
              TEXT
            </RButton>
          </ButtonGroup>
        </div>
        {!!values && values.fileType === "IMAGE" && (
          <>
            <div className="form-group">
              <label className="fs-16 medium-text">
                Banner <span className="asterisk">*</span>
              </label>
              <div className="file-upload">
                <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
                  Upload Banner
                  <input
                    id="banner"
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
              <Error field="banner" />
            </div>
            <div className="Image-Grid mb-4">
              {imageData.map((result, index) => {
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
                          setFieldValue("banner", data);
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
                      src={URL.createObjectURL(result)}
                      className="Image"
                      style={{
                        width: "320px",
                        borderRadius: "4%",
                        height: "180px",
                        background: "#404040"
                      }}
                    />
                    <div className="error-msg">
                      {!!errors.banner && (errors.banner[index] || "")}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {!!values && values.fileType === "TEXT" && (
          <>
            <label className="fs-16 medium-text">Text</label>
            <FieldArray name="text">
              {({ insert, remove, push }) => (
                <div>
                  {values.text.map((text, index) => (
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        padding: "5px",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flex: 3,
                          alignItems: "center",
                          marginTop: "14px",
                          marginRight: "12px"
                        }}
                      >
                        <div className="form-group flex flex-1">
                          <input
                            type="text"
                            className="form-control react-form-input"
                            id="text"
                            name={`text.${index}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={text}
                            placeholder="Text"
                          />
                          {!!touched.text &&
                            !!touched.text[index] &&
                            !!errors.text &&
                            !!errors.text[index] && (
                              <div className="fs-12 c-text-danger">
                                {errors.text[index]}
                              </div>
                            )}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center"
                        }}
                      >
                        <Button
                          className="c-btn c-danger form-button fs-16 demi-bold-text mr-15"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button
                      className="c-btn form-button fs-16 demi-bold-text mr-15 mb-2"
                      type="button"
                      onClick={() => {
                        push("");
                      }}
                      style={{ maxWidth: "163px" }}
                    >
                      Add Text
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>
            {/* <Error field="text" /> */}
            {!values?.text?.length && <Error field="text" />}
          </>
        )}
        {isStore && deviceCount === 0 && (
          <div>
            <Button
              className="c-btn mb-12"
              onClick={() => props.history.push("/store/device/add")}
              style={{
                backgroundColor: "#4CBB17",
                color: "#fff"
              }}
            >
              <i className="fas fa-plus mr-10"></i>Add Device
            </Button>
          </div>
        )}

        <div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || (isStore && deviceCount === 0)}
            className={clsx(
              "c-btn c-info form-button fs-16 demi-bold-text mr-15",
              values.fileType === "TEXT" && "mt-8"
            )}
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

export default compose(enhancer)(AdvertisementForm);
