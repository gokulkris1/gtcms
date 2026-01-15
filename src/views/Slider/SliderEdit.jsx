import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import SliderForm from "components/slider/SliderForm";

const SliderEdit = props => {
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
      const formData = new FormData();
      formData.append("sliderImage", data.images);
      formData.append("sliderLink", data.sliderLink);

      setLoading(true);

      Api.post("/admin/slider/add", formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/slider");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error.message);
        });
    } else if (action === "edit") {
      const formData = new FormData();
      formData.append("sliderImage", data.images);
      formData.append("sliderLink", data.sliderLink);
      setLoading(true);
      Api.put(`/admin/slider/edit?sliderId=${id}`, formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/slider");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
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
          title="sidebar.slider"
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.slider"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() => props.history.push("/slider")}
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"}{" "}
              Slider Image
            </div>
          </div>
          <div className="roe-card-body">
            <SliderForm
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

export default connect(mapStateToProps, null)(SliderEdit);
