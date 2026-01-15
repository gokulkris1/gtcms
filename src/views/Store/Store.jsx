import React from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import StoreTable from "components/store/StoreTable";

const Store = props => {
  return (
    <UserWrapper {...props}>
      <PageTitle
        title="sidebar.store"
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.dashboard"
          },
          {
            name: "sidebar.store"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <StoreTable {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(Store);
