import React from "react";

const StoreModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.storeLogo && (
            <div className="form-group">
              <label className="fs-16 medium-text"> Image&nbsp;:&nbsp;</label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.storeLogo}
                    style={{
                      height: "150px",
                      width: "150px",
                      marginBottom: "15px"
                    }}
                    alt="loading..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data.storeName}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Active&nbsp;:&nbsp;</label>
          {data.active ? "Yes" : "No"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Google Link&nbsp;:&nbsp;</label>
          <div className="breakWord">{data.googleLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Twitter Link&nbsp;:&nbsp;</label>
          <div className="breakWord">{data.twitterLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Facebook Link&nbsp;:&nbsp;
          </label>
          <div className="breakWord">{data.facebookLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Appstore Link&nbsp;:&nbsp;
          </label>
          <div className="breakWord">{data.appstoreLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Playstore Link&nbsp;:&nbsp;
          </label>
          <div className="breakWord">{data.playstoreLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text ">
            Advertisement Image Link&nbsp;:&nbsp;
          </label>
          <div className="breakWord">{data.advertisementImageLink}</div>
        </div>
        <div className="d-flex">
          {data.advertisementImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Advertisement Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.advertisementImage}
                    style={{
                      height: "150px",
                      width: "200px",
                      marginBottom: "15px"
                    }}
                    alt="loading..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default StoreModal;
