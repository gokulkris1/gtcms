import React, { useEffect } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import BannerTable from "components/banner/BannerTable";

const Banner = props => {
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
          !isStore ? "sidebar.banner" : `Banner Management (${props.storeName})`
        }
        className="plr-15"
        breadCrumb={[
          {
            name: !isStore ? "sidebar.dashboard" : "sidebar.storeDashboard"
          },
          {
            name: "sidebar.banner"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <BannerTable isStore={isStore} {...props} />
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

export default connect(mapStateToProps, null)(Banner);
