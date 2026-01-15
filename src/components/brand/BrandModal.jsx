import React from "react";

const BrandModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.brandLogo && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Brand Logo&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.brandLogo}
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
          <label className="fs-16 medium-text">Brand Name&nbsp;:&nbsp;</label>
          {data.brandName}
        </div>
        <div>
          {data.brandImages && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Brand Images&nbsp;:&nbsp;
              </label>
              <div className="flex space-between" style={{ flexFlow: "wrap" }}>
                {data.brandImages.length > 0 &&
                  data.brandImages.map(image => {
                    return (
                      <div id="item_icon">
                        <img
                          className="top-header-profile-class view-image"
                          src={image}
                          style={{
                            height: "180px",
                            width: "320px",
                            marginBottom: "15px"
                          }}
                          alt="loading..."
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BrandModal;
