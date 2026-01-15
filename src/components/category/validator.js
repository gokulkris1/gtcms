import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    category: Yup.string().required("Category is required")
  }),
  mapPropsToValues: props => ({
    category: props.editedData ? props.editedData.categoryName : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
