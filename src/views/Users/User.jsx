import React, { useEffect } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import UserTable from "components/users/UserTable";
import { connect } from "react-redux";
import storeActions from "redux/storeID/actions";

const { setStoreDeviceCounts } = storeActions;

const User = props => {
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
          !isStore ? "sidebar.users" : `Device Management (${props.storeName})`
        }
        className="plr-15"
        breadCrumb={[
          {
            name: !isStore ? "sidebar.dashboard" : "sidebar.storeDashboard"
          },
          {
            name: "sidebar.users"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <UserTable isStore={isStore} {...props} />
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

export default connect(mapStateToProps, { setStoreDeviceCounts })(User);
