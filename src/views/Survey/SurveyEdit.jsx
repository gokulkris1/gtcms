import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import SurveyForm from "components/survey/SurveyForm";

const SurveyEdit = props => {
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
      formData.append("surveyImage", data.images);

      setLoading(true);

      Api.post(
        `/admin/survey/add?surveyLink=${data?.surveyLink}&title=${data?.title}`, //&description=${data.description}
        formData
      )
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/survey");
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
      const formData = new FormData();
      formData.append("surveyImage", data.images);
      setLoading(true);
      Api.put(
        `/admin/survey/edit?surveyId=${id}&surveyLink=${data?.surveyLink}&title=${data?.title}`, //&description=${data.description}
        formData
      )
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/survey");
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
          title="sidebar.survey"
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.survey"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() => props.history.push("/survey")}
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"}{" "}
              Survey
            </div>
          </div>
          <div className="roe-card-body">
            <SurveyForm
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

export default connect(mapStateToProps, null)(SurveyEdit);
