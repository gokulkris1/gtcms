import Api from "api/Api";
import Button from "components/button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import Select from "react-select";
import { DateRange } from "react-date-range";
import { currencyCodes } from "helper/currencyCodes";
import { ButtonGroup, Button as RButton } from "reactstrap";
import { countryAlpha2Codes } from "helper/countryAlpha2Codes";

const CouponForm = props => {
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

  const [categoryList, setCategoryList] = useState([]);
  const [uploadImage, setUploadImage] = useState(null);
  const [storeLogo, setStoreLogo] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    Api.post("/user/category/list", {}).then(res => {
      setCategoryList(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (editedData) {
      setDate([
        {
          startDate: new Date(editedData.fromDate),
          endDate: new Date(editedData.toDate),
          key: "selection"
        }
      ]);
      setFieldValue("dates", {
        startDate: new Date(editedData.fromDate),
        endDate: new Date(editedData.toDate),
        key: "selection"
      });
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

  const handleStoreLogo = (e, setValue) => {
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
          setFieldTouched("storeLogo", true, true);

          setValue("storeLogo", URL.createObjectURL(fileObj));
          setValue("storeLogos", fileObj);
          setStoreLogo(URL.createObjectURL(fileObj));
        };
      } else {
        //No file was input or browser doesn't support client side reading
        // form.submit();
      }
    } else {
      setStoreLogo(null);
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
          setFieldTouched("backgroundImage", true, true);

          setValue("backgroundImage", URL.createObjectURL(fileObj));
          setValue("backgroundImages", fileObj);
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

  console.log("hello", values.country);

  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label className="fs-16 medium-text">
            Coupon Code <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="couponCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.couponCode}
            placeholder="Coupon Code"
          />
          <Error field="couponCode" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Coupon Link <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="couponLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.couponLink}
            placeholder="Coupon Link"
          />
          <Error field="couponLink" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text pr-12">
            Discount type <span className="asterisk">*</span>
          </label>
          <ButtonGroup>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("discountType", "AMOUNT")}
              active={values?.discountType === "AMOUNT"}
            >
              AMOUNT
            </RButton>
            <RButton
              color="secondary"
              outline
              onClick={() => setFieldValue("discountType", "PERCENTAGE")}
              active={values?.discountType === "PERCENTAGE"}
            >
              PERCENTAGE
            </RButton>
          </ButtonGroup>
          <Error field="discountType" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Discount{values.discountType === "PERCENTAGE" && "(%)"}{" "}
            <span className="asterisk">*</span>
          </label>
          <input
            type="number"
            className="form-control react-form-input"
            id="discount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.discount}
            placeholder="Discount"
          />
          <Error field="discount" />
        </div>
        {values.discountType === "AMOUNT" && (
          <div className="form-group">
            <label className="fs-16 medium-text">
              Currency <span className="asterisk">*</span>
            </label>
            <Select
              name="currency"
              id="currency"
              placeholder="Select currency"
              value={values.currency}
              onChange={data => {
                setFieldValue("currency", data);
              }}
              onBlur={handleBlur}
              options={currencyCodes}
            />
            <Error field="currency" />
          </div>
        )}

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
            Coupon Start & End Date <span className="asterisk">*</span>
          </label>
          <div>
            <DateRange
              editableDateInputs={false}
              minDate={new Date()}
              onChange={item => {
                setFieldValue("dates", item.selection);
                setDate([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
          </div>
          <Error field="dates" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Category <span className="asterisk">*</span>
          </label>
          <Select
            name="category"
            id="category"
            placeholder="Select Category"
            value={values.category}
            onChange={data => {
              setFieldValue("category", data);
            }}
            onBlur={handleBlur}
            options={
              categoryList.length > 0
                ? categoryList.map(result => {
                    return {
                      label: result.categoryName,
                      value: result.categoryId
                    };
                  })
                : []
            }
          />
          <Error field="category" />
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
            Description <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            placeholder="Description"
          />
          <Error field="Description" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Store Logo <span className="asterisk">*</span>
          </label>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload logo
              <input
                id="storeLogo"
                className="file-upload__input"
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg"
                onChange={e => handleStoreLogo(e, setFieldValue)}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {(storeLogo || values.storeLogo) && (
            <img
              src={storeLogo ? storeLogo : values.storeLogo}
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
          <Error field="storeLogo" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Background Image <span className="asterisk">*</span>
          </label>
          <div className="text-info">
            (Note: Image should be of dimension 335*154)
          </div>
          <div className="file-upload">
            <label className="c-btn c-secondary  form-button fs-16 demi-bold-text mt-15">
              Upload Background Image
              <input
                id="storeLogo"
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
          {(uploadImage || values.backgroundImage) && (
            <img
              src={uploadImage ? uploadImage : values.backgroundImage}
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
          <Error field="backgroundImage" />
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

export default compose(enhancer)(CouponForm);
