import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    type: Yup.string()
      .oneOf(["ALL", "BY_USER"], "Field type must be either IMAGE or TEXT")
      .required("Type is required"),
    users: Yup.string()
      .when("type", {
        is: val => val === "BY_USER",
        then: Yup.string()
          .required("Users is required")
          .nullable(),
        otherwise: Yup.string().notRequired()
      })
      .nullable()
  }),
  mapPropsToValues: props => ({
    users: "",
    type: "BY_USER"
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
