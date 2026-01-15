import moment from "moment";
import React from "react";

const ViewModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div>
          {data.bannersResDTOSet && (
            <div className="form-group">
              <label className="fs-16 medium-text">Banner&nbsp;:&nbsp;</label>
              <div className="flex space-between" style={{ flexFlow: "wrap" }}>
                {data.bannersResDTOSet.length > 0 &&
                  data.bannersResDTOSet.map(image => {
                    let fileTypeSlit = image.bannerImage.split(".");
                    let fileType = fileTypeSlit[fileTypeSlit?.length - 1];
                    return (
                      <div id="item_icon">
                        {fileType !== "mp4" ? (
                          <img
                            className="top-header-profile-class view-image"
                            src={image.bannerImage}
                            style={{
                              height: "180px",
                              width: "320px",
                              marginBottom: "15px"
                            }}
                            alt="loading..."
                          />
                        ) : (
                          <video
                            className="top-header-profile-class view-image"
                            src={image.bannerImage}
                            controls
                            autoPlay
                            style={{
                              height: "180px",
                              width: "320px",
                              marginBottom: "15px"
                            }}
                            alt="loading..."
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Email&nbsp;:&nbsp;</label>
          {data.email}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Display Time&nbsp;:&nbsp;</label>
          {data?.bannerDisplayTime ? `${data?.bannerDisplayTime} seconds` : "-"}
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
