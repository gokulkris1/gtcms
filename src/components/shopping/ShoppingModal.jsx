import { countryAlpha2Codes } from "helper/countryAlpha2Codes";
import React from "react";

const ShoppingModal = props => {
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
          <label className="fs-16 medium-text">Country&nbsp;:&nbsp;</label>
          {data?.country
            ? countryAlpha2Codes.find(el => el.value === data?.country).label
            : "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Link&nbsp;:&nbsp;</label>
          <div className="breakWord"> {data.link}</div>
        </div>
      </form>
    </div>
  );
};

export default ShoppingModal;
