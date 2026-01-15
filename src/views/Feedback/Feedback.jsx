import React from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import FeedbackTable from "components/feedback/FeedbackTable";
import { connect } from "react-redux";

const Feedback = props => {
  return (
    <UserWrapper {...props}>
      <PageTitle
        title={"sidebar.feedback"}
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.dashboard"
          },
          {
            name: "sidebar.feedback"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <FeedbackTable {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(Feedback);
