import Api from "api/Api";
import PageTitle from "components/common/PageTitle";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import storeActions from "redux/storeID/actions";
import UserWrapper from "views/Users/user.style";
import StoreDashboardCountCard from "./StoreDashboardCountCard";

const { setStoreBranchCounts, setStoreDeviceCounts } = storeActions;

const StoreDashboard = props => {
  const { location } = props.history;
  const { state } = location;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.storeId) {
      setLoading(true);
      Api.post(`/admin/store/dashboard?storeId=${props.storeId}`)
        .then(res => {
          if (res.status) {
            setData(res.data.data);
            props.setStoreBranchCounts(res.data.data?.branchCount);
            props.setStoreDeviceCounts(res.data.data?.deviceCount);
            setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      props.history.push("/store");
    }
  }, [state]);

  return (
    <UserWrapper {...props}>
      <PageTitle
        title={
          !props.storeName
            ? "sidebar.store"
            : `Store Managenemt (${props.storeName})`
        }
        className="plr-15"
        breadCrumb={[
          {
            name: "sidebar.store"
          },
          {
            name: "sidebar.dashboard"
          }
        ]}
      />
      {!loading && !!data && (
        <div className="flex flex-1 flex-column">
          <div className="flex flex-row flex-wrap">
            <StoreDashboardCountCard
              title="Branches"
              count={data?.branchCount}
              onClick={() => props.history.push("/store/branch")}
            />
            <StoreDashboardCountCard
              title="Devices"
              count={data?.deviceCount}
              disabled={data?.branchCount === 0}
              onClick={() => props.history.push("/store/device")}
            />
            <StoreDashboardCountCard
              title="Banners"
              count={data?.bannerCount}
              disabled={data?.branchCount === 0 || data?.deviceCount === 0}
              onClick={() => props.history.push("/store/banner")}
            />
            <StoreDashboardCountCard
              title="Receipts"
              count={data?.receiptCount}
              onClick={() => props.history.push("/store/receipt")}
            />
          </div>
        </div>
      )}
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    ...state.storeID
  };
};

export default connect(mapStateToProps, {
  setStoreBranchCounts,
  setStoreDeviceCounts
})(StoreDashboard);
