import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .nullable(),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .nullable(),
    branch: Yup.string().required("Branch is required"),
    storeName: Yup.string().required("Store name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email not valid")
      .nullable()
  }),
  validate: values => {
    const errors = {};
    const pattern = new RegExp(".*[@#$%^&+=]");
    const pattern2 = new RegExp("(?=.*[A-Z])");
    const pattern3 = new RegExp("(?=.*[0-9])");

    if (values.password) {
      if (values.password.length < 8) {
        errors.password = "Password must have 8 characters";
      } else if (!pattern.test(values.password)) {
        errors.password = `Password must have at-least one special character `;
      } else if (!pattern2.test(values.password)) {
        errors.password = `Password must have at-least one Capital Letter `;
      } else if (!pattern3.test(values.password)) {
        errors.password = `Password must have at-least one Number `;
      }
    }

    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password not matched";
    }
    return errors;
  },
  mapPropsToValues: props => ({
    storeName: props.editedData?.storeId
      ? {
          label: props.editedData.storeName,
          value: props.editedData.storeId
        }
      : props.isStore && props.storeId
      ? { label: props.storeName, value: props.storeId }
      : "",
    branch: props.editedData?.branchId
      ? {
          label: props.editedData.branchName,
          value: props.editedData.branchId
        }
      : "",
    email: props.editedData ? props.editedData.email : "",
    password: props.editedData ? props.editedData.passwordField : "",
    confirmPassword: props.editedData ? props.editedData.passwordField : ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
