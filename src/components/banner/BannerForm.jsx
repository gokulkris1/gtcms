import Api from "api/Api";
import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Select from "react-select";

// let ImageArray = [];

const BannerForm = props => {
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
    banners,
    handleChange
  } = props;

  const [deviceList, setDeviceList] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    if (action === "edit" && editedData?.bannersResDTOSet?.length) {
      setImageData([...editedData?.bannersResDTOSet]);
    }
  }, [editedData]);

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

  const getExtension = url => {
    const split = url.split(".");
    return split[split?.length - 1];
  };

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
      let fileObj = e.target.files[i];
      if (fileObj) {
        if (fileObj) {
          const img = new Image();

          img.src = window.URL.createObjectURL(fileObj);

          img.onload = function() {
            const width = img.naturalWidth,
              height = img.naturalHeight;

            window.URL.revokeObjectURL(img.src);

            setFieldValue("isImageValid", true);
            let data = imageData;
            data.push(fileObj);
            setFieldValue("banner", data);
            setImageData([...data]);
          };
        }
      }
      if (fileObj.type === "video/mp4") {
        const video = document.createElement("video");

        video.src = window.URL.createObjectURL(fileObj);
        video.preload = "metadata"; // Load metadata to get video duration, etc.

        video.onloadedmetadata = function() {
          const duration = video.duration;

          window.URL.revokeObjectURL(video.src);

          setFieldValue("isImageValid", true);
          let data = imageData;
          data.push(fileObj);
          setFieldValue("banner", data);
          setImageData([...data]);
        };
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
              deviceList?.length > 0
                ? deviceList?.map(result => {
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
          />
          <Error field="device" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Display Time (seconds) <span className="asterisk">*</span>
          </label>
          <input
            type="number"
            className="form-control react-form-input"
            id="bannerDisplayTime"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bannerDisplayTime}
            placeholder="Seconds"
            onKeyDown={e =>
              (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
            }
            onPaste={e => {
              e.preventDefault();
              return false;
            }}
          />
          <Error field="bannerDisplayTime" />
        </div>
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
                accept="image/jpg,image/png,image/jpeg,video/mp4"
                onChange={e => imageHandler(e)}
                multiple
                onBlur={handleBlur}
              />
            </label>
          </div>
          <Error field="banner" />
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
                      setFieldValue("banner", data);
                    }}
                    style={{
                      backgroundColor: "#fff",
                      color: "black",
                      border: "none",
                      padding: 1,
                      borderRadius: 4
                    }}
                  />
                </div>

                {(result?.bannerFileType &&
                  result?.bannerFileType !== "VIDEO") ||
                (!result?.bannerFileType &&
                  !result?.type &&
                  getExtension(result?.bannerImage) !== "mp4") ||
                (result?.type && result?.type !== "video/mp4") ? (
                  <img
                    alt="loading"
                    src={
                      result?.bannerImage
                        ? result?.bannerImage
                        : URL.createObjectURL(result)
                    }
                    className="Image"
                    style={{
                      width: "320px",
                      borderRadius: "4%",
                      height: "180px",
                      background: "#404040",
                      objectFit: result?.type === "video/mp4" && "contain"
                    }}
                    title={"Image"}
                  />
                ) : (
                  <video
                    autoPlay
                    controls
                    src={
                      result?.bannerImage
                        ? result?.bannerImage
                        : URL.createObjectURL(result)
                    }
                    style={{
                      width: "320px",
                      borderRadius: "4%",
                      height: "180px",
                      background: "#404040"
                    }}
                    onClick={e => {
                      e.preventDefault();
                      let data = imageData;
                      data.splice([data.indexOf(result)], 1);
                      setImageData([...data]);
                      setFieldValue("banner", data);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
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

export default compose(enhancer)(BannerForm);
