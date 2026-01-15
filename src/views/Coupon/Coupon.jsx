import React from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import CouponTable from "components/coupon/CouponTable";

const Coupon = props => {
  return (
    <UserWrapper {...props}>
      <PageTitle
        title="sidebar.coupon"
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.dashboard"
          },
          {
            name: "sidebar.coupon"
          },
          {
            name: "sidebar.lists"
          }
        ]}
      />
      <div className="user-tbl">
        <CouponTable {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(Coupon);
