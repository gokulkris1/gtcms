import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    voucherImage: Yup.string().required("Voucher Image is required"),
    voucherCode: Yup.string().required("Voucher Code is required"),
    link: Yup.string()
      .url("Link should be valid URL")
      .required("Link is required"),
    points: Yup.number()
      .typeError("Points should be number")
      .min(1, "Points should be greater than 0")
      .required("Points is required"),
    amount: Yup.number()
      .typeError("Amount should be number")
      .min(1, "Amount should be greater than 0")
      .required("Amount is required"),
    storeName: Yup.string().required("Store Name is required"),
    expiryDate: Yup.date()
      .typeError("Select valid date")
      .required("Expiry Date is Required")
  }),
  mapPropsToValues: props => ({
    voucherImage: props.editedData ? props.editedData.voucherImage : "",
    voucherCode: props.editedData ? props.editedData.voucherCode : "",
    name: props.editedData ? props.editedData.storeName : "",
    link: props.editedData ? props.editedData.link : "",
    storeName: props.editedData ? props.editedData.storeName : "",
    points: props.editedData ? props.editedData.points : "",
    amount: props.editedData ? props.editedData.amount : "",
    desc: props.editedData ? props.editedData.description : "",
    expiryDate: props.editedData ? props.editedData.expireDate : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
