import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    image: Yup.string().required("Store logo is required"),
    name: Yup.string().required("Store name is required"),
    link: Yup.string()
      .url("Link should be valid URL")
      .required("Link is required"),
    country: Yup.string()
      .required("Country is required")
      .nullable()
  }),
  mapPropsToValues: props => ({
    image: props.editedData ? props.editedData.storeLogo : "",
    name: props.editedData ? props.editedData.storeName : "",
    link: props.editedData ? props.editedData.link : "",
    country: props.editedData
      ? { label: props.editedData.country, value: props.editedData.country }
      : null
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
