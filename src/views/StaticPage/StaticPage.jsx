import React from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import StaticPageTable from "components/staticpage/StaticPageTable";

const StaticPage = props => {
  return (
    <UserWrapper {...props}>
      <PageTitle
        title="sidebar.staticpage"
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.dashboard"
          },
          {
            name: "sidebar.staticpage"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <StaticPageTable {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(StaticPage);
