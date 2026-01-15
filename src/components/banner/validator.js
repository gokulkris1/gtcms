import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    banner: Yup.string().required("Banner is required"),
    device: Yup.string().required("Device is required"),
    bannerDisplayTime: Yup.string().required("Display time is required")
  }),
  mapPropsToValues: props => ({
    device: props.editedData
      ? {
          label: props.editedData.email,
          value: props.editedData.email,
          id: props.editedData.deviceTokenId
        }
      : "",
    bannerDisplayTime: props?.editedData?.bannerDisplayTime
      ? props?.editedData?.bannerDisplayTime
      : "",
    banner: props?.editedData?.bannersResDTOSet?.length
      ? props?.editedData?.bannersResDTOSet
      : []
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
