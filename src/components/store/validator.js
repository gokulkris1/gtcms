import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    image: Yup.string()
      .required("Store logo is required")
      .nullable(),
    name: Yup.string()
      .required("Store name is required")
      .nullable(),
    advertisementImageLink: Yup.string()
      .url("Advertisement Image Link must be valid URL")
      .required("Avertisement Image Link is required")
      .nullable(),
    advertisementImage: Yup.string()
      .required("Advertisement Image is required")
      .nullable(),
    twitterLink: Yup.string()
      .url("Link must be valid URL")
      .nullable(),
    googleLink: Yup.string()
      .url("Link must be valid URL")
      .nullable(),
    facebookLink: Yup.string()
      .url("Link must be valid URL")
      .nullable(),
    appstoreLink: Yup.string()
      .url("Link must be valid URL")
      .nullable(),
    playstoreLink: Yup.string()
      .url("Link must be valid URL")
      .nullable()
  }),
  mapPropsToValues: props => ({
    isActive: props.editedData ? props.editedData.active : false,
    image: props.editedData ? props.editedData.storeLogo : "",
    name: props.editedData ? props.editedData.storeName : "",
    twitterLink: props.editedData ? props.editedData.twitterLink : "",
    googleLink: props.editedData ? props.editedData.googleLink : "",
    facebookLink: props.editedData ? props.editedData.facebookLink : "",
    appstoreLink: props.editedData ? props.editedData.appstoreLink : "",
    playstoreLink: props.editedData ? props.editedData.playstoreLink : "",
    advertisementImageLink: props.editedData
      ? props.editedData.advertisementImageLink
      : "",
    advertisementImage: props.editedData
      ? props.editedData.advertisementImage
      : null
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
