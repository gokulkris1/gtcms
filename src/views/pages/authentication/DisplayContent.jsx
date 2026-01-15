import React from "react";
import { locakscreenBack } from "helper/constant";
import { PDFViewer } from "react-view-pdf";
import { useParams } from "react-router";

export const Applogo = require("assets/images/logo-white.svg");

const DisplayContent = props => {
  const loginContainer = {
    // backgroundImage: `url(${locakscreenBack})`,
    background: "#4CBB17",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
    padding: 0
  };

  const url = new URLSearchParams(props.location.search).get("url");
  return (
    <div className="container-fluid pricing-page" style={loginContainer}>
      <div
        className="Pricing-title text-center"
        style={{ margin: "0px 0px 20px 0px", padding: "10px" }}
      >
        <div className="login-icon">
          <img src={Applogo} alt="icon" height="100px" />
        </div>
      </div>
      <div className="pricing-detail">
        <div className="container">
          <div className="row" style={{ position: "relative" }}>
            <button
              className="pricing-button"
              style={{
                position: "absolute",
                right: "15px",
                top: "0px",
                zIndex: "10"
              }}
            >
              Download
            </button>
            {url.split(".").pop() == "pdf" ? (
              <div className="col">
                <PDFViewer url={url} style={{ width: "100%" }} />
              </div>
            ) : (
              <div className="col">
                <img src={url} style={{ width: "100%" }} alt="icon" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
