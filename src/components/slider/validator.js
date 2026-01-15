import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    sliderImage: Yup.string()
      .required("Image is required")
      .nullable(),
    sliderLink: Yup.string()
      .required("Slider link is required")
      .url("Slider link should be valid URL")
      .max(255, "Slider Link should be of less than 255 characters")
      .nullable()
  }),
  mapPropsToValues: props => ({
    sliderImage: props.editedData ? props.editedData.sliderImage : "",
    sliderLink: props.editedData ? props.editedData.sliderLink : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
