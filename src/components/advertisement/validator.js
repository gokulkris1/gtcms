import { withFormik } from "formik";
import { string } from "prop-types";
import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    fileType: Yup.string()
      .oneOf(["IMAGE", "TEXT"], "Field type must be either IMAGE or TEXT")
      .required("File type is required"),
    banner: Yup.string().when("fileType", {
      is: val => val === "IMAGE",
      then: Yup.string().required("Advertisement Banner is required"),
      otherwise: Yup.string().notRequired()
    }),
    text: Yup.array()
      .of(Yup.string().required("Text is required"))
      .when("fileType", {
        is: val => val === "TEXT",
        then: Yup.array().min(1, "Minimum 1 text is required!")
      }),
    device: Yup.string()
      .required("Device is required")
      .nullable()
  }),
  mapPropsToValues: props => ({
    device: props.editedData
      ? {
          label: props.editedData.email,
          value: props.editedData.email,
          id: props.editedData.deviceTokenId
        }
      : "",
    fileType: props.editedData ? props.editedData.fileType : "IMAGE",
    text: []
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
