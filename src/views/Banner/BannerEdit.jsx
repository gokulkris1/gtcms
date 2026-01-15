import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import BannerForm from "components/banner/BannerForm";

const BannerEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam =
    props.location.pathname === "/banner/edit" ||
    props.location.pathname === "/store/banner/edit"
      ? true
      : false;
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
      const body = {
        deviceTokenIds: data.device.map(device => device.id),
        bannerDisplayTime: data?.bannerDisplayTime
      };
      const formData = new FormData();
      data.banner.forEach(image => {
        formData.append(`bannerImageList`, image);
      });
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.post("/admin/banner/add", formData)
        .then(response => {
          if (toaster.current) toaster.current.success(response.data.message);
          setTimeout(() => {
            !props.isStore
              ? props.history.push("/banner")
              : props.history.push("/store/banner");
          }, 1000);
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    } else if (action === "edit") {
      setLoading(true);
      let bannerIds = [];
      let bannerImageList = [];

      if (data?.banner?.length) {
        data.banner.forEach(image => {
          if (image?.bannerId) {
            bannerIds.push(image?.bannerId);
          } else {
            bannerImageList.push(image);
          }
        });
      }
      const body = {
        deviceTokenId: data?.device?.id,
        bannerDisplayTime: data?.bannerDisplayTime
      };
      const formData = new FormData();
      if (bannerImageList?.length) {
        bannerImageList.forEach(image => {
          formData.append(`bannerImageList`, image);
        });
      }
      if (bannerIds?.length) {
        bannerIds.forEach((id, i) => {
          formData.append(`bannerIds[${i}]`, id);
        });
      }
      for (let key in body) {
        formData.append(key, body[key]);
      }
      Api.put("/admin/banner/edit", formData)
        .then(response => {
          if (toaster.current) toaster.current.success(response.data.message);
          setTimeout(() => {
            !props.isStore
              ? props.history.push("/banner")
              : props.history.push("/store/banner");
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
              ? "sidebar.banner"
              : `Banner Management (${props.storeName})`
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
              name: "sidebar.banner"
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
              ? props.history.push("/banner")
              : props.history.push("/store/banner")
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
              Banner
            </div>
          </div>
          <div className="roe-card-body">
            <BannerForm
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

export default connect(mapStateToProps, null)(BannerEdit);
