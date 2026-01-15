import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import BranchTable from "components/branch/BranchTable";
import storeActions from "redux/storeID/actions";

const { setStoreBranchCounts } = storeActions;

const Branch = props => {
  const { isStore, storeId } = props;

  useEffect(() => {
    if (isStore && !storeId) {
      props.history.push("/store");
    }
  }, [isStore, storeId]);

  return (
    <UserWrapper {...props}>
      <PageTitle
        title={
          !isStore ? "sidebar.branch" : `Branch Management (${props.storeName})`
        }
        className="plr-15"
        breadCrumb={[
          {
            name: !isStore ? "sidebar.dashboard" : "sidebar.storeDashboard"
          },
          {
            name: "sidebar.branch"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <BranchTable isStore={isStore} {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    ...state.storeID
  };
};

export default connect(mapStateToProps, { setStoreBranchCounts })(Branch);
