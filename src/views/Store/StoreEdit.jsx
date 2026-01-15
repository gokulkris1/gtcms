import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import StoreForm from "components/store/StoreForm";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";

const StoreEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam = props.match.params.hasOwnProperty("id");
  const id = props.match.params.id;

  const toaster = useRef();

  useEffect(() => {
    setEditedData(props.location.state);
  }, [props]);

  const submitFormHandler = (data, action) => {
    if (action === "add") {
      const body = {
        active: data.isActive === "true" ? true : false,
        appstoreLink: data.appstoreLink,
        facebookLink: data.facebookLink,
        googleLink: data.googleLink,
        playstoreLink: data.playstoreLink,
        storeName: data.name,
        twitterLink: data.twitterLink,
        storeLogo: data.images,
        advertisementImage: data.advertisementImages,
        advertisementImageLink: data.advertisementImageLink
      };
      const formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.post("/admin/store/add", formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/store");
            }, 1000);
          } else {
            if (toaster.current) toaster.current.error(response.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    } else if (action === "edit") {
      const body = {
        storeId: id,
        active: data.isActive === "true" ? true : false,
        appstoreLink: data.appstoreLink,
        facebookLink: data.facebookLink,
        googleLink: data.googleLink,
        playstoreLink: data.playstoreLink,
        storeName: data.name,
        twitterLink: data.twitterLink,
        storeLogo: data.images,
        advertisementImage: data.advertisementImages,
        advertisementImageLink: data.advertisementImageLink
      };
      const formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.put("/admin/store/edit", formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/store");
            }, 1000);
          } else {
            if (toaster.current) toaster.current.error(response.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error.message);
        });
    }
  };

  return (
    <UserWrapper {...props}>
      <div className="pos-relative">
        <PageTitle
          title="sidebar.store"
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.store"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() => props.history.push("/store")}
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"} Store
            </div>
          </div>
          <div className="roe-card-body">
            <StoreForm
              onSubmit={submitFormHandler}
              editedData={editedData}
              action={hasParam ? "edit" : "add"}
              loading={loading}
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
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(StoreEdit);
