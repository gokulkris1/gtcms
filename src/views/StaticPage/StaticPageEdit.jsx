import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import StaticPageForm from "components/staticpage/StaticPageForm";

const StaticPageEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam = props.match.params.hasOwnProperty("id");
  const id = props.match.params.id;

  const toaster = useRef();

  useEffect(() => {
    setEditedData(props.location.state);
  }, [props]);

  const submitFormHandler = (data, action) => {
    // if (action === "add") {
    //   setLoading(true);
    //   const body = {
    //     brandName: data.brandName,
    //     logo: data.brandLogos,
    //   };
    //   const formData = new FormData();
    //   data.brandImages.forEach((image) => {
    //     formData.append(`brandImages`, image);
    //   });
    //   for (let key in body) {
    //     formData.append(key, body[key]);
    //   }
    //   setLoading(true);
    //   Api.post("/admin/brand/add", formData)
    //     .then((response) => {
    //       if (toaster.current) toaster.current.success(response.data.message);
    //       setTimeout(() => {
    //         props.history.push("/static-page");
    //       }, 1000);
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       if (toaster.current) toaster.current.error(error);
    //     });
    // } else
    if (action === "edit") {
      setLoading(true);
      const body = {
        content: data.content
      };
      setLoading(true);
      Api.put(`staticPage/admin/edit/${id}`, body)
        .then(response => {
          if (toaster.current) toaster.current.success(response.data.message);
          setTimeout(() => {
            props.history.push("/static-page");
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
          title="sidebar.staticpage"
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.staticpage"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() => props.history.push("/static-page")}
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"}{" "}
              Static Page
            </div>
          </div>
          <div className="roe-card-body">
            <StaticPageForm
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

export default connect(mapStateToProps, null)(StaticPageEdit);
