import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    image: Yup.string()
      .required("Image is required")
      .nullable(),
    title: Yup.string().required("Title is required"),
    description: Yup.string()
      .required("Description is required")
      .nullable()
  }),
  mapPropsToValues: props => ({
    image: props.editedData ? props.editedData.image : "",
    title: props.editedData ? props.editedData.title : "",
    description: props.editedData ? props.editedData.description : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
