import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Email not valid")
    // feedback: Yup.string().required("This field is required")
  }),
  mapPropsToValues: props => ({
    email: "",
    feedback: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
