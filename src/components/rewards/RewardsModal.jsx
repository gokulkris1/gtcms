import moment from "moment";
import React from "react";

const RewardsModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.voucherImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Voucher Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.voucherImage}
                    style={{
                      height: "180px",
                      width: "280px",
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
          <label className="fs-16 medium-text">Voucher Code&nbsp;:&nbsp;</label>
          {data.voucherCode ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data.storeName ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Link&nbsp;:&nbsp;</label>
          {data.link ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Amount&nbsp;:&nbsp;</label>
          {data.amount ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Points&nbsp;:&nbsp;</label>
          {data.points ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Expiry Date&nbsp;:&nbsp;</label>
          {data.expireDate ? moment(data.expireDate).format("YYYY-MM-DD") : "-"}
        </div>
      </form>
    </div>
  );
};

export default RewardsModal;
