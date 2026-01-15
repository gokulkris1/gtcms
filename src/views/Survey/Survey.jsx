import React from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import SurveyTable from "components/survey/SurveyTable";

const Survey = props => {
  return (
    <UserWrapper {...props}>
      <PageTitle
        title="sidebar.survey"
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.dashboard"
          },
          {
            name: "sidebar.survey"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <SurveyTable {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(Survey);
