import Button from "components/button/Button";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import enhancer from "./validator";
import { countryAlpha2Codes } from "helper/countryAlpha2Codes";
import Api from "api/Api";
import Select from "react-select";

const ProductForm = props => {
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
    setFieldValue,
    editedData
  } = props;

  const [productsList, setProductList] = useState([]);
  const [productsListLoading, setProductListLoaing] = useState(false);

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
            Country <span className="asterisk">*</span>
          </label>
          <Select
            name="country"
            id="country"
            value={
              !editedData
                ? values.country
                : countryAlpha2Codes.find(el => el.value === editedData.country)
            }
            isDisabled={!!editedData}
            placeholder="Select Country"
            onChange={data => {
              setProductListLoaing(true);
              setFieldValue("country", data);
              setFieldValue("product", "");
              setProductList([]);

              Api.post(`/admin/product/listProducts?country=${data.value}`)
                .then(res => {
                  setProductList(res.data.data);
                  setProductListLoaing(false);
                })
                .catch(err => setProductListLoaing(false));
            }}
            onBlur={handleBlur}
            options={countryAlpha2Codes}
          />
          <Error field="country" />
        </div>

        <div className="form-group">
          <label className="fs-16 medium-text">
            Product <span className="asterisk">*</span>
          </label>
          <Select
            name="product"
            id="product"
            value={values.product}
            placeholder="Select Product"
            onChange={data => {
              setFieldValue("product", data);
            }}
            isDisabled={!!editedData}
            onBlur={handleBlur}
            isLoading={productsListLoading && values.country}
            noOptionsMessage={() => (
              <>
                {!values.country
                  ? "Select country first"
                  : productsListLoading
                  ? "Loading...."
                  : "No Categories Found"}
              </>
            )}
            options={
              productsList.length > 0
                ? productsList.map(result => {
                    return {
                      label: (
                        <>
                          {result?.name} ({result?.category})
                        </>
                      ),
                      value: result?.name,
                      prodValue: {
                        ...result,
                        currencyCode: result?.currencyCode.length
                          ? result?.currencyCode[0]
                          : null,
                        image: result?.image.length
                          ? result?.image[0]?.src
                          : null
                      }
                    };
                  })
                : []
            }
          />
          <Error field="product" />
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

export default compose(enhancer)(ProductForm);
