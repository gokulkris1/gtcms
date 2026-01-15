import React from "react";

const View = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Operation Type&nbsp;:&nbsp;
          </label>
          {data.operationsType ? data.operationsType : "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Points&nbsp;:&nbsp;</label>
          {data.points ? data.points : "-"}
        </div>
      </form>
    </div>
  );
};

export default View;
