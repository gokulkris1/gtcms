import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required")
  }),
  mapPropsToValues: props => ({
    title: props.editedData ? props.editedData.title : "",
    content: props.editedData ? props.editedData.content : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
