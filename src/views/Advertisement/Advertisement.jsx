import React, { useEffect } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import AdvertisementTable from "components/advertisement/AdvertisementTable";

const Advertisement = props => {
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
          !isStore
            ? "sidebar.advertisement"
            : `Advertisement Management (${props.storeName})`
        }
        className="plr-15"
        breadCrumb={[
          {
            name: !isStore ? "sidebar.dashboard" : "sidebar.storeDashboard"
          },
          {
            name: "sidebar.advertisement"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <AdvertisementTable isStore={isStore} {...props} />
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

export default connect(mapStateToProps, null)(Advertisement);
