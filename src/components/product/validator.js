import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    points: Yup.number()
      .typeError("Points should be number")
      .min(1, "Points should be greater than 0")
      .required("Points is required"),
    amount: Yup.number()
      .typeError("Amount should be number")
      .min(1, "Amount should be greater than 0")
      .required("Amount is required"),
    country: Yup.string()
      .required("Country is required")
      .nullable(),
    product: Yup.string().required("Product is required")
  }),
  mapPropsToValues: props => ({
    points: props.editedData ? props.editedData.points : "",
    amount: props.editedData ? props.editedData.amount : "",
    country: props.editedData
      ? { label: props.editedData.country, value: props.editedData.country }
      : null,
    product: props.editedData?.productId
      ? {
          label: `${props.editedData?.name} (${props.editedData?.category})`,
          value: props.editedData?.name
        }
      : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
