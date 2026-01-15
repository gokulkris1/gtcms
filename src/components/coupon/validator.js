import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    couponCode: Yup.string().required("Coupon code is required"),
    couponLink: Yup.string()
      .required("Coupon link is required")
      .url("Coupon link should be valid URL")
      .max(255, "Coupon Link should be of less than 255 characters")
      .nullable(),
    dates: Yup.string().required("Date is required"),
    description: Yup.string().required("Description is required"),
    storeName: Yup.string().required("Store name is required"),
    storeLogo: Yup.string()
      .required("Store logo is required")
      .nullable(),
    country: Yup.string()
      .required("Country is required")
      .nullable(),
    backgroundImage: Yup.string()
      .required("Background Image is required")
      .nullable(),
    category: Yup.string()
      .required("Category is required")
      .nullable(),
    discountType: Yup.string()
      .oneOf(
        ["AMOUNT", "PERCENTAGE"],
        "Discount type must be either AMOUNT or PERCENTAGE"
      )
      .required("Discount type is required")
      .nullable(),
    currency: Yup.string().when("discountType", {
      is: val => val === "AMOUNT",
      then: Yup.string()
        .required("Currency is required")
        .nullable(),
      otherwise: Yup.string().notRequired()
    }),
    discount: Yup.number().when("discountType", {
      is: val => val === "PERCENTAGE",
      then: Yup.number()
        .min(1, "Minimum discount percenteage should be 1")
        .max(100, "Maximum discount percenteage should be 100")
        .required("Discount is required"),
      otherwise: Yup.number()
        .min(1, "Minimum discount amount should be 1")
        .required("Discount is required")
    })
  }),
  mapPropsToValues: props => ({
    couponLink: props.editedData ? props.editedData.couponLink : "",
    couponCode: props.editedData ? props.editedData.couponCode : "",
    discount: props.editedData ? props.editedData.freeText : "",
    description: props.editedData ? props.editedData.description : "",
    barcode: props.editedData ? props.editedData.barcodeImage : "",
    storeName: props.editedData ? props.editedData.storeName : "",
    category: props.editedData
      ? {
          label: props.editedData.category.categoryName,
          value: props.editedData.categoryId
        }
      : "",
    country: props.editedData
      ? { label: props.editedData.country, value: props.editedData.country }
      : null,
    discountType: props.editedData ? props.editedData.discountType : "AMOUNT",
    storeLogo: props.editedData ? props.editedData.storeLogo : "",
    backgroundImage: props.editedData ? props.editedData.backgroundImage : "",
    currency: props.editedData?.currency
      ? {
          label: props.editedData.currency,
          value: props.editedData.currency
        }
      : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
