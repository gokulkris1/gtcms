import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    branchName: Yup.string()
      .required("Branch name is required")
      .nullable(),
    storeName: Yup.number()
      .required("Store name is required")
      .nullable(),
    address: Yup.string()
      .required("Address is required")
      .nullable(),
    city: Yup.string()
      .required("City is required")
      .nullable(),
    state: Yup.string()
      .required("State is required")
      .nullable(),
    country: Yup.string()
      .required("Country is required")
      .nullable()
  }),
  mapPropsToValues: props => ({
    branchName: props.editedData ? props.editedData.branchName : "",
    storeName: props.editedData
      ? props.editedData.storeId
      : props.isStore && props.storeId
      ? props.storeId
      : "",
    address: props.editedData ? props.editedData.address : "",
    city: props.editedData ? props.editedData.city : "",
    state: props.editedData ? props.editedData.state : "",
    country: props.editedData ? props.editedData.country : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
