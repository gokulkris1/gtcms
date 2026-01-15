import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    operationsType: Yup.string().required("Title is required"),
    points: Yup.number()
      .typeError("Points should be number")
      .min(1, "Minimum Points should be 1")
      .required("Points is required")
  }),
  mapPropsToValues: props => ({
    operationsType: props.editedData ? props.editedData.operationsType : "",
    points: props.editedData ? props.editedData.points : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
