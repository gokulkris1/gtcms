import { connect } from "react-redux";
import React from "react";
import { withRouter } from "react-router";
import clsx from "clsx";

const StoreDashboardCountCard = ({
  count,
  title,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <div
      role="button"
      className={clsx(
        "flex flex-1 flex-column justify-content-center align-items-center p-4 m-4 border-radius-5 border",
        disabled && "divDisabled"
      )}
      style={{
        boxShadow:
          "rgb(90 113 208 / 11%) 0px 0px 0px 0px, rgb(167 175 183 / 33%) 0px 4px 16px 0px",
        border: "1px solid rgb(221, 228, 235)",
        height: 260,
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <div className="fs-32 flex flex-1 justify-content-center align-items-end text-center themeColor">
        {!!count ? count : "-"}
      </div>
      <div className="fs-32 flex flex-1 flex-wrap justify-content-center align-items-center text-center themeColor">
        {!!title ? title : "-"}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(
  mapStateToProps,
  withRouter,
  null
)(StoreDashboardCountCard);
