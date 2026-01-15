import CKEditor from "ckeditor4-react";
import Button from "components/button/Button";
import React from "react";

import { compose } from "redux";
import { config } from "util/editorconfig";
import enhancer from "./validator";

const StaticPageForm = props => {
  const {
    handleChange,
    handleBlur,
    errors,
    loading,
    touched,
    submitCount,
    onSubmit,
    values,
    action,
    setFieldTouched,
    setFieldValue
  } = props;

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let { values, isValid, handleSubmit } = props;
    if (isValid) {
      onSubmit(values, action);
    }
    handleSubmit();
  };

  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label className="fs-16 medium-text">
            Title <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            id="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            placeholder="Title"
            disabled
          />
          <Error field="title" />
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Content</label>
          <CKEditor
            id="contentEn"
            onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
            config={config}
            data={values.content}
            onChange={event => {
              setFieldValue("content", event.editor.getData());
            }}
            onBlur={event => {
              setFieldTouched("content", true, true);
            }}
          />
          <Error field="content" />
        </div>
        <div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="c-btn c-info form-button fs-16 demi-bold-text mr-15"
            style={{ maxWidth: "125px" }}
            dataStyle="expand-right"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default compose(enhancer)(StaticPageForm);
