/* eslint-disable no-unused-expressions */
import Api from "api/Api";
import Button from "components/button/Button";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./enhancer";
import Select from "react-select";
import { FieldArray } from "formik";
import { Input } from "reactstrap";
import CKEditor from "ckeditor4-react";
import { config } from "util/editorconfig";
import CommonModal from "components/common/CommonModal";
import ViewModal from "./ViewModal";
import Toaster from "components/common/Toaster";
import Loader from "components/common/Loader";

const EmailTemplateForm = props => {
  const toaster = useRef(null);
  const {
    handleBlur,
    errors,
    touched,
    submitCount,
    values,
    setFieldValue,
    isStore,
    storeId,
    handleChange,
    setFieldTouched,
    setValues
  } = props;

  const [viewModal, setviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isStore) {
      Api.post("/admin/emailTemplate/list", { storesId: storeId })
        .then(res => {
          if (res?.data?.status) {
            setValues({
              title: res.data.data?.title
                ? res.data.data?.title
                : `Receipt - ${props?.storeName}`,
              footer: res.data.data?.footer,
              body1: `<p>Hi,</p><br><p>Please see the attached receipt for your shopping in ${
                props?.storeName ? props?.storeName : "{{storeName}}"
              } at given {{storeLocation}} on {{date}}</p>
              `,
              body2: res.data.data?.body,
              body3: res.data.data?.regards,
              titleImageList: res.data.data?.emailTemplateHeaderImagesResDTOList
                ?.length
                ? res.data.data?.emailTemplateHeaderImagesResDTOList
                : [],
              footerImageList: res.data.data
                ?.emailTemplateFooterImagesResDTOList?.length
                ? res.data.data?.emailTemplateFooterImagesResDTOList
                : [],
              deletetitleImageList: null,
              deleteFooterIamgeList: null,
              emailTemplateId: !!res.data.data?.emailTemplateId
                ? res.data.data?.emailTemplateId
                : null
            });
          }
          setTimeout(() => {
            setDataLoading(false);
          }, 500);
        })
        .catch(error => {
          if (toaster.current) toaster.current.error(error.message);
          setDataLoading(false);
        });
    }
  }, [isStore, storeId]);

  const Error = props => {
    const field1 = props.field;
    if (
      ((errors[field1] && touched[field1]) || submitCount > 0) &&
      !Array.isArray(errors[field1])
    ) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const ErrorForm = props => {
    const { index, name, field } = props;
    if (
      (errors?.[field]?.[index]?.[name] && touched?.[field]?.[index]?.[name]) ||
      submitCount > 0
    ) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors?.[field]?.[index]?.[name]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const handleAdvertisementImage = (e, setValue, index, name) => {
    if (e.target.files[0]) {
      let fileObj = e.target.files[0];
      if (fileObj) {
        const img = new Image();

        img.src = window.URL.createObjectURL(fileObj);

        img.onload = function() {
          const width = img.naturalWidth,
            height = img.naturalHeight;

          window.URL.revokeObjectURL(img.src);
          setValue("width", width);
          setValue("height", height);
          setFieldTouched(`${name}[${index}].image`, true, true);

          setValue(`${name}[${index}].image`, URL.createObjectURL(fileObj));
          setValue(`${name}[${index}].images`, fileObj);
        };
      } else {
        //No file was input or browser doesn't support client side reading
        // form.submit();
      }
    } else {
      // setUploadAdvertisementImage(null);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let { values, isValid, handleSubmit } = props;
    if (isValid) {
      let data = { ...values };

      let templateImageList = {};

      data?.titleImageList?.forEach((val, index) => {
        const commonProperties = {
          [`emailTemplateImageReqDTOList[${index}].imageLink`]: val.imageLink,
          [`emailTemplateImageReqDTOList[${index}].imageType`]: "HEADER"
        };
        if (!val?.emailTemplateImageId) {
          templateImageList = {
            ...templateImageList,
            [`emailTemplateImageReqDTOList[${index}].imageLink`]: val.imageLink,
            [`emailTemplateImageReqDTOList[${index}].imageType`]: "HEADER",
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index}].image`]: val.images
          };
        } else if (val?.images) {
          templateImageList = {
            ...templateImageList,
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index}].emailTemplateImageId`]: val.emailTemplateImageId,
            [`emailTemplateImageReqDTOList[${index}].image`]: val.images
          };
        } else {
          templateImageList = {
            ...templateImageList,
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index}].emailTemplateImageId`]: val.emailTemplateImageId,
            [`emailTemplateImageReqDTOList[${index}].existingImage`]: val.image
          };
        }
      });
      let templateImageList1 = {};
      data?.footerImageList?.forEach((val, index) => {
        const commonProperties = {
          [`emailTemplateImageReqDTOList[${index +
            data?.titleImageList?.length}].imageLink`]: val.imageLink,
          [`emailTemplateImageReqDTOList[${index +
            data?.titleImageList?.length}].imageType`]: "FOOTER"
        };
        if (!val?.emailTemplateImageId) {
          templateImageList1 = {
            ...templateImageList1,
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index +
              data?.titleImageList?.length}].image`]: val.images
          };
        } else if (val?.images) {
          templateImageList1 = {
            ...templateImageList1,
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index +
              data?.titleImageList
                ?.length}].emailTemplateImageId`]: val.emailTemplateImageId,
            [`emailTemplateImageReqDTOList[${index +
              data?.titleImageList?.length}].image`]: val.images
          };
        } else {
          templateImageList1 = {
            ...templateImageList1,
            ...commonProperties,
            [`emailTemplateImageReqDTOList[${index +
              data?.titleImageList
                ?.length}].emailTemplateImageId`]: val.emailTemplateImageId,
            [`emailTemplateImageReqDTOList[${index +
              data?.titleImageList?.length}].existingImage`]: val.image
          };
        }
      });

      let deleteProductObj = null;
      let deleteArray = [];
      if (data?.deletetitleImageList?.length) {
        deleteArray = [...data?.deletetitleImageList];
      }
      if (data?.deleteFooterIamgeList?.length) {
        deleteArray = [...deleteArray, ...data?.deleteFooterIamgeList];
      }

      deleteArray?.forEach((val, index) => {
        deleteProductObj = {
          ...deleteProductObj,
          [`deleteEmailTemplateImagesDTOList[${index}].deleteEmailTemplateImagesId`]: val
        };
      });

      const body = {
        title: values?.title,
        body: values?.body2,
        greetings: values?.body1,
        regards: values?.body3,
        footer: values?.footer,
        storesId: storeId,
        ...templateImageList,
        ...templateImageList1,
        emailTemplateId: values?.emailTemplateId
          ? values?.emailTemplateId
          : undefined,
        ...deleteProductObj
      };

      const formData = new FormData();
      for (let key in body) {
        if (body[key] !== undefined) formData.append(key, body[key]);
      }
      setLoading(true);
      Api.post("/admin/emailTemplate/add", formData)
        .then(res => {
          if (res.data.status) {
            if (toaster.current) toaster.current.success(res.data.message);
            setValues({
              title: res.data.data?.title,
              footer: res.data.data?.footer,
              body1: res.data.data?.greetings,
              body2: res.data.data?.body,
              body3: res.data.data?.regards,
              titleImageList: res.data.data?.emailTemplateHeaderImagesResDTOList
                ?.length
                ? res.data.data?.emailTemplateHeaderImagesResDTOList
                : [],
              footerImageList: res.data.data
                ?.emailTemplateFooterImagesResDTOList?.length
                ? res.data.data?.emailTemplateFooterImagesResDTOList
                : [],
              deletetitleImageList: null,
              deleteFooterIamgeList: null,
              emailTemplateId: res.data.data?.emailTemplateId
            });
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
      {dataLoading ? (
        <Loader loading={dataLoading} />
      ) : (
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <div className="form-group">
            <label className="fs-16 medium-text">
              Title <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              className="form-control react-form-input"
              id="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.title}
              placeholder="Title"
            />
            <Error field="title" />
          </div>

          <FieldArray
            name="titleImageList"
            render={({ push, insert, remove }) => (
              <div>
                {values?.titleImageList?.map((product, index) => {
                  return (
                    <>
                      <div key={index} className="mb-10 roe-card-style">
                        <div className="roe-card-body mt-10">
                          <label className="fs-16 medium-text">
                            Title Image {index + 1}
                          </label>
                          <div className="form-group">
                            <label className="fs-16 medium-text">
                              Link <span className="asterisk">*</span>
                            </label>
                            <Input
                              type="text"
                              className="form-control react-form-input"
                              id="imageLink"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`titleImageList[${index}].imageLink`}
                              value={values.titleImageList[index].imageLink}
                              placeholder="Advertisement Image Link"
                            />
                            <ErrorForm
                              field="titleImageList"
                              index={index}
                              name="imageLink"
                            />
                          </div>
                          <div className="form-group">
                            <label className="fs-16 medium-text">
                              Image <span className="asterisk">*</span>
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
                                  onChange={e =>
                                    handleAdvertisementImage(
                                      e,
                                      setFieldValue,
                                      index,
                                      "titleImageList"
                                    )
                                  }
                                  onBlur={handleBlur}
                                />
                              </label>
                            </div>
                            {values.titleImageList?.[index]?.image && (
                              <img
                                src={values.titleImageList?.[index]?.image}
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
                            <ErrorForm
                              field="titleImageList"
                              index={index}
                              name="image"
                            />
                          </div>{" "}
                          <Button
                            type="button"
                            className="c-btn c-info form-button fs-16 demi-bold-text"
                            style={{ maxWidth: "125px" }}
                            dataStyle="expand-right"
                            onClick={() => {
                              if (
                                values?.titleImageList?.[index]
                                  ?.emailTemplateImageId
                              ) {
                                const deleteId =
                                  values?.titleImageList?.[index]
                                    ?.emailTemplateImageId;
                                const id = values?.deletetitleImageList
                                  ? [...values?.deletetitleImageList, deleteId]
                                  : [deleteId];
                                setFieldValue("deletetitleImageList", id);
                              }
                              remove(index);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>
                  {!values?.titleImageList?.length ? (
                    <Button
                      type="button"
                      className="c-btn c-info form-button fs-16 demi-bold-text mr-15 mb-10"
                      style={{ maxWidth: "200px" }}
                      dataStyle="expand-right"
                      onClick={() =>
                        push({
                          imageLink: "",
                          image: ""
                        })
                      }
                    >
                      Add Title Image
                    </Button>
                  ) : null}
                  <Error field="titleImageList" />
                </div>
              </div>
            )}
          />

          <div className="form-group">
            <div className="form-group">
              <label className="fs-16 medium-text">Body 1</label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                rows={5}
                disabled={true}
                className="form-control react-form-input"
                value={values.body1
                  .replaceAll("<p>", "")
                  .replaceAll("</p>", "\n")
                  .replaceAll("<br>", "\n")
                  .replaceAll("&nbsp;", " ")}
              />
            </div>
            <Error field="body1" />
          </div>

          <div className="form-group">
            <label className="fs-16 medium-text">Body 2</label>
            <CKEditor
              id="body2"
              onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
              config={config}
              data={values.body2}
              onChange={event => {
                setFieldValue("body2", event.editor.getData());
              }}
              onBlur={event => {
                setFieldTouched("body2", true, true);
              }}
            />
            <Error field="body2" />
          </div>

          <div className="form-group">
            <label className="fs-16 medium-text">Body 3</label>
            <CKEditor
              id="body3"
              onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
              config={config}
              data={values.body3}
              onChange={event => {
                setFieldValue("body3", event.editor.getData());
              }}
              onBlur={event => {
                setFieldTouched("body3", true, true);
              }}
            />
            <Error field="body3" />
          </div>

          <div className="form-group">
            <label className="fs-16 medium-text">Footer</label>
            <CKEditor
              id="footer"
              onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
              data={values.footer}
              onChange={event => {
                setFieldValue("footer", event.editor.getData());
              }}
              onBlur={event => {
                setFieldTouched("footer", true, true);
              }}
            />
            <Error field="footer" />
          </div>

          <FieldArray
            name="footerImageList"
            render={({ push, insert, remove }) => (
              <div>
                {values?.footerImageList?.map((product, index) => {
                  return (
                    <>
                      <div key={index} className="mb-10 roe-card-style">
                        <div className="roe-card-body mt-10">
                          <label className="fs-16 medium-text">
                            Footer Image {index + 1}
                          </label>

                          <div className="form-group">
                            <label className="fs-16 medium-text">
                              Link <span className="asterisk">*</span>
                            </label>
                            <Input
                              type="text"
                              className="form-control react-form-input"
                              id="imageLink"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={`footerImageList[${index}].imageLink`}
                              value={values.footerImageList[index].imageLink}
                              placeholder="Advertisement Image Link"
                            />
                            <ErrorForm
                              field="footerImageList"
                              index={index}
                              name="imageLink"
                            />
                          </div>
                          <div className="form-group">
                            <label className="fs-16 medium-text">
                              Image <span className="asterisk">*</span>
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
                                  onChange={e =>
                                    handleAdvertisementImage(
                                      e,
                                      setFieldValue,
                                      index,
                                      "footerImageList"
                                    )
                                  }
                                  onBlur={handleBlur}
                                />
                              </label>
                            </div>
                            {values.footerImageList?.[index]?.image && (
                              <img
                                src={values.footerImageList?.[index]?.image}
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
                            <ErrorForm
                              field="footerImageList"
                              index={index}
                              name="image"
                            />
                          </div>
                          <Button
                            type="button"
                            className="c-btn c-info form-button fs-16 demi-bold-text"
                            style={{ maxWidth: "125px" }}
                            dataStyle="expand-right"
                            onClick={() => {
                              if (
                                values?.footerImageList?.[index]
                                  ?.emailTemplateImageId
                              ) {
                                const deleteId =
                                  values?.footerImageList?.[index]
                                    ?.emailTemplateImageId;
                                const id = values?.deleteFooterIamgeList
                                  ? [...values?.deleteFooterIamgeList, deleteId]
                                  : [deleteId];
                                setFieldValue("deleteFooterIamgeList", id);
                              }
                              remove(index);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>
                  <Button
                    type="button"
                    className="c-btn c-info form-button fs-16 demi-bold-text mr-15 mb-10"
                    style={{ maxWidth: "200px" }}
                    dataStyle="expand-right"
                    onClick={() =>
                      push({
                        imageLink: "",
                        image: ""
                      })
                    }
                  >
                    Add Footer Image
                  </Button>
                  <Error field="footerImageList" />
                </div>
              </div>
            )}
          />
          <div className="d-flex">
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
            <Button
              className="c-btn form-button fs-16 demi-bold-text mr-15"
              style={{ maxWidth: "125px" }}
              onClick={() => setviewModal(true)}
            >
              Preview
            </Button>
          </div>
        </form>
      )}
      <Toaster ref={toaster} />
      <CommonModal
        size="lg"
        modal={viewModal}
        toggle={() => {
          setviewModal(!viewModal);
        }}
        viewModalCheck={true}
        headerData={"Preview"}
        children={<ViewModal data={{ ...values }} />}
      />
    </div>
  );
};

export default compose(enhancer)(EmailTemplateForm);
