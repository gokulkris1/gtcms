import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    brandName: Yup.string().required("Brand name is required"),
    brandLogo: Yup.string().required("Brand logo is required"),
    brandImages: Yup.string().required("Brand images is required")
  }),
  mapPropsToValues: props => ({
    brandName: props.editedData ? props.editedData.brandName : "",
    brandLogo: props.editedData ? props.editedData.brandLogo : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
