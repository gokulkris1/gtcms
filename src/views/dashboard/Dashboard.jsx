import Api from "api/Api";
import LoaderComponent from "components/common/LoaderComponent";
import PageTitle from "components/common/PageTitle";
import SmallLoader from "components/common/SmallLoader";
import { DashboardChart } from "components/dashboard/DashboardCharts";
import DashboardCountCard from "components/dashboard/DashboardCountCard";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserWrapper from "./user.style";

const Dashboard = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    Api.get(`/admin/dashboard`)
      .then(res => {
        if (res.status) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const handleReceiptClick = (el, isReceipt) => {
    if (!isReceipt) return;
    props.history.push(`/receipt`, el.name);
  };

  return (
    <UserWrapper {...props}>
      <PageTitle title={"sidebar.dashboard"} className="plr-15" />
      {!!loading && (
        <div className="flex flex-1 flex-column fill-height pa-100 justify-content-center align-items-center">
          <SmallLoader />
        </div>
      )}
      {!loading && !!data && (
        <div className="flex flex-1 flex-column fill-height">
          <div className="flex flex-row flex-wrap ptb-32">
            <DashboardCountCard
              title="Stores"
              count={data?.storeCount}
              onClick={() => props.history.push("/store")}
            />
            <DashboardCountCard
              title="Devices"
              count={data?.deviceCount}
              onClick={() => props.history.push("/device")}
            />
            <DashboardCountCard
              title="Receipts"
              count={data?.receiptsCount}
              onClick={() => props.history.push("/receipt")}
            />
            <DashboardCountCard
              title="Users"
              count={data?.userCount}
              onClick={() => props.history.push("/user")}
            />
          </div>
        </div>
      )}
      {!!data && (
        <div className="plr-28">
          <div className="headline mb-8 themeColor">Analytics</div>
          <div className="flex flex-row fill-width flex-wrap space-between flex-wrap">
            <div className="flex flex-column bg-white h-400 pl-14 ptb-10 flex-1 border-radius-12 mr-8">
              <div className="headline">App Users Platform</div>
              <DashboardChart data={data?.deviceOSType} type="PIE" />
            </div>
            <div className="flex flex-column bg-white h-400 pl-14 ptb-10 flex-1 border-radius-12 ml-8">
              <div className="headline">User Registration</div>
              <DashboardChart data={data?.userRegType} type="PIE" />
            </div>
          </div>
          <div className="flex flex-row fill-width flex-wrap mtb-16">
            <div className="flex flex-column bg-white h-400 pl-14 ptb-10 flex-1 border-radius-12">
              <div className="headline">Receipts</div>
              <div className="flex fill-height justify-content-between">
                <div className="flex wp-40 fill-height">
                  <DashboardChart
                    data={data?.receiptType?.filter(
                      rec => rec.name === "UNSCANNED"
                    )}
                    type="PIE"
                    isReceipt={true}
                    handleReceiptClick={handleReceiptClick}
                    outerRadius={90}
                  />
                </div>
                <div className="flex wp-60 fill-height">
                  <DashboardChart
                    data={data?.receiptType?.filter(
                      rec => rec.name !== "UNSCANNED"
                    )}
                    type="PIE"
                    isReceipt={true}
                    handleReceiptClick={handleReceiptClick}
                    outerRadius={90}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, withRouter, null)(Dashboard);
