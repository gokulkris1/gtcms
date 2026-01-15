import React from "react";
import "./Loader.css";

const Loader = props => {
  return (
    props.loading && (
      <div className="-loading -active">
        <div className="-loading-inner">
          <div className="loader"></div>
        </div>
      </div>
    )
  );
};

export default Loader;
