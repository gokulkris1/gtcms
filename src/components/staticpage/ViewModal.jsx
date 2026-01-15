import React from "react";

const View = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Title&nbsp;:&nbsp;</label>
          {data.title}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Content&nbsp;:&nbsp;</label>
          <div
            className="text-left"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </form>
    </div>
  );
};

export default View;
