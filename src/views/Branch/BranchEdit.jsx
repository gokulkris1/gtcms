import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import BranchForm from "components/branch/BranchForm";

const StoreEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam = props.match.params.hasOwnProperty("id");
  const id = props.match.params.id;

  const toaster = useRef();

  useEffect(() => {
    setEditedData(props.location.state);
  }, [props]);

  useEffect(() => {
    if (props.isStore && !props.storeId) {
      props.history.push("/store");
    }
  }, [props.isStore, props.storeId]);

  const submitFormHandler = (data, action) => {
    if (action === "add") {
      setLoading(true);
      Api.post(
        `/admin/branch/add?address=${data.address}&branchName=${
          data.branchName
        }&city=${data.city}&country=${data.country}&state=${
          data.state
        }&storeId=${parseInt(data.storeName)}`
      )
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              !props.isStore
                ? props.history.push("/branch")
                : props.history.push("/store/branch");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    } else if (action === "edit") {
      Api.put(
        `/admin/branch/edit?address=${data.address}&branchName=${
          data.branchName
        }&city=${data.city}&country=${data.country}&state=${
          data.state
        }&storeId=${parseInt(data.storeName)}&branchId=${id}`
      )
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              !props.isStore
                ? props.history.push("/branch")
                : props.history.push("/store/branch");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
        })

        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    }
  };

  return (
    <UserWrapper {...props}>
      <div className="pos-relative">
        <PageTitle
          title={
            !props.isStore
              ? "sidebar.branch"
              : `Branch Management (${props.storeName})`
          }
          className="plr-15"
          breadCrumb={[
            {
              name: !props.isStore
                ? "sidebar.dashboard"
                : "sidebar.storeDashboard"
            },
            {
              name: "sidebar.branch"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() =>
            !props.isStore
              ? props.history.push("/branch")
              : props.history.push("/store/branch")
          }
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"}{" "}
              Branch
            </div>
          </div>
          <div className="roe-card-body">
            <BranchForm
              onSubmit={submitFormHandler}
              editedData={editedData}
              action={hasParam ? "edit" : "add"}
              loading={loading}
              isStore={props.isStore}
              storeId={props.storeId}
              storeName={props.storeName}
            />
          </div>
        </div>
      </div>
      <Toaster ref={toaster} />
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    ...state.storeID
  };
};

export default connect(mapStateToProps, null)(StoreEdit);
