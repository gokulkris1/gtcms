import React, { useEffect, useState, useRef } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import AdvertisementForm from "components/advertisement/AdvertisementForm";

const AdvertisementEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam =
    props.location.pathname === "/advertisement/edit" ? true : false;
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
      let body = {
        deviceTokenIds: data.device.map(device => device.id),
        fileType: data.fileType
      };
      const formData = new FormData();
      data.banner &&
        data.banner.length &&
        data.banner.forEach(image => {
          formData.append(`advertisementList`, image);
        });
      for (let key in body) {
        formData.append(key, body[key]);
      }
      let url =
        data.fileType === "IMAGE"
          ? "/admin/advertisement/add/image"
          : "/admin/advertisement/add/text";
      if (data.fileType === "TEXT") {
        body.advertisementText = data.text;
      }
      const reqBody = data.fileType === "IMAGE" ? formData : body;
      setLoading(true);
      Api.post(url, reqBody)
        .then(response => {
          if (toaster.current) toaster.current.success(response.data.message);
          setTimeout(() => {
            !props.isStore
              ? props.history.push("/advertisement")
              : props.history.push("/store/advertisement");
          }, 1000);
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    } else if (action === "edit") {
      setLoading(true);
      const body = {
        deviceTokenIds: [data.device.id]
      };
      const formData = new FormData();
      data.banner.forEach(image => {
        formData.append(`bannerImageList`, image);
      });
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.post("/admin/advertisement/add", formData)
        .then(response => {
          if (toaster.current) toaster.current.success(response.data.message);
          setTimeout(() => {
            !props.isStore
              ? props.history.push("/advertisement")
              : props.history.push("/store/advertisement");
          }, 1000);
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
              ? "sidebar.advertisement"
              : `Advertisement Management (${props.storeName})`
          }
          // title="sidebar.banner"
          className="plr-15"
          breadCrumb={[
            {
              name: !props.isStore
                ? "sidebar.dashboard"
                : "sidebar.storeDashboard"
            },
            {
              name: "sidebar.advertisement"
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
              ? props.history.push("/advertisement")
              : props.history.push("/store/advertisement")
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
              Advertisement
            </div>
          </div>
          <div className="roe-card-body">
            <AdvertisementForm
              onSubmit={submitFormHandler}
              editedData={editedData}
              action={hasParam ? "edit" : "add"}
              loading={loading}
              isStore={props.isStore}
              storeId={props.storeId}
              storeName={props.storeName}
              branchCount={props.branchCount}
              deviceCount={props.deviceCount}
              history={props.history}
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

export default connect(mapStateToProps, null)(AdvertisementEdit);
