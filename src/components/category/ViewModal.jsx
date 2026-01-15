import React from "react";

const View = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Id&nbsp;:&nbsp;</label>
          {data?.categoryId ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Name&nbsp;:&nbsp;</label>
          {data?.categoryName ?? "-"}
        </div>
      </form>
    </div>
  );
};

export default View;
