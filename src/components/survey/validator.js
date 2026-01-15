import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    surveyImage: Yup.string().nullable(),
    title: Yup.string().required("Title is required"),
    // description: Yup.string()
    //   .required("Description is required")
    //   .nullable(),
    surveyLink: Yup.string()
      .url("Link should be valid URL")
      .required("Link is required")
  }),
  mapPropsToValues: props => ({
    surveyImage: props.editedData ? props.editedData.surveyImage : "",
    title: props.editedData ? props.editedData.title : "",
    surveyLink: props.editedData ? props.editedData.surveyLink : ""
    // description: props.editedData ? props.editedData.description : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
