import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .nullable(),
    titleImageList: Yup.array()
      .max(1, "Only one image allowed")
      .of(
        Yup.object().shape({
          image: Yup.string()
            .required("Image is required")
            .nullable(),
          imageLink: Yup.string()
            .url("Image Link must be valid URL")
            .required("Image Link is required")
            .nullable()
        })
      ),
    body1: Yup.string()
      .required("Content is required")
      .nullable(),
    body2: Yup.string()
      .required("Content is required")
      .nullable(),
    body3: Yup.string()
      .required("Content is required")
      .nullable(),
    footer: Yup.string()
      .required("Footer is required")
      .nullable(),
    footerImageList: Yup.array().of(
      Yup.object().shape({
        image: Yup.string()
          .required("Image is required")
          .nullable(),
        imageLink: Yup.string()
          .url("Image Link must be valid URL")
          .required("Image Link is required")
          .nullable()
      })
    )
  }),
  mapPropsToValues: props => {
    console.log("ppppp", props);
    return {
      title: "",
      footer: null,
      body1: null,
      body2: null,
      body3: null,
      titleImageList: [],
      footerImageList: [],
      deletetitleImageList: [],
      deleteFooterIamgeList: []
    };
  },
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
