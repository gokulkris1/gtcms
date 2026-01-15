import { countryAlpha2Codes } from "helper/countryAlpha2Codes";
import moment from "moment";
import React from "react";

const ViewModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Coupon Code&nbsp;:&nbsp;</label>
          {data?.couponCode}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Coupon Link&nbsp;:&nbsp;</label>
          <div className="breakWord">{data?.couponLink}</div>
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">
            Discount Type&nbsp;:&nbsp;
          </label>
          {data?.discountType}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Discount&nbsp;:&nbsp;</label>
          {data?.freeText}
        </div>
        {data?.discountType === "AMOUNT" && (
          <div className="form-group">
            <label className="fs-16 medium-text">Currency&nbsp;:&nbsp;</label>
            {data?.currency}
          </div>
        )}
        <div className="form-group">
          <label className="fs-16 medium-text">Country&nbsp;:&nbsp;</label>
          {data?.country
            ? countryAlpha2Codes.find(el => el.value === data?.country).label
            : "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Start Date&nbsp;:&nbsp;</label>
          {moment(data?.fromDate).format("DD/MM/YYYY")}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">End Date&nbsp;:&nbsp;</label>
          {moment(data?.toDate).format("DD/MM/YYYY")}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Description&nbsp;:&nbsp;</label>
          {data?.description}
        </div>
        <div className="d-flex">
          {data?.barcodeImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">Barcode&nbsp;:&nbsp;</label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data?.barcodeImage}
                    style={{
                      height: "96px",
                      width: "320px",
                      marginBottom: "15px",
                      objectFit: "cover"
                    }}
                    alt="loading..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Category&nbsp;:&nbsp;</label>
          {data?.category?.categoryName}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data?.storeName}
        </div>
        <div className="d-flex">
          {data?.storeLogo && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Store Logo&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data?.storeLogo}
                    style={{
                      height: "75px",
                      width: "75px",
                      marginBottom: "15px"
                    }}
                    alt="loading..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex">
          {data?.backgroundImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Background Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data?.backgroundImage}
                    style={{
                      height: "148px",
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

export default ViewModal;
