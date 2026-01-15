import React from "react";
import PDFImage from "../../assets/images/pdf.png";

const FeedbackModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Id&nbsp;:&nbsp;</label>
          {data.feedbackId ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">From&nbsp;:&nbsp;</label>
          {data.feedbackFrom ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">User Id&nbsp;:&nbsp;</label>
          {data.userId ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Email&nbsp;:&nbsp;</label>
          {data?.email !== "" ? data.email : "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Name&nbsp;:&nbsp;</label>
          {data.firstName ?? ""} {data.lastName ?? ""}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Id&nbsp;:&nbsp;</label>
          {data.storeId ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data.storeName ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Comment&nbsp;:&nbsp;</label>
          {data.comment ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Rating&nbsp;:&nbsp;</label>
          <i className="fas fa-star starRating"></i>
          {data.rating ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Receipt Id&nbsp;:&nbsp;</label>
          {data.receiptId ?? "-"}
        </div>
        <div className="d-flex">
          {data.receipt && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Receipt Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  {data.receipt.split(".").pop() === "pdf" ? (
                    <div>
                      <img
                        className="top-header-profile-class view-image"
                        src={PDFImage}
                        style={{
                          height: "100px",
                          width: "100px",
                          marginBottom: "15px"
                        }}
                        alt="loading..."
                      />
                      <a target="_blank" rel="noopener" href={data.receipt}>
                        View PDF ({data.receipt.split("/").pop()})
                      </a>
                    </div>
                  ) : (
                    <a target="_blank" rel="noopener" href={data.receipt}>
                      <img
                        className="top-header-profile-class view-image"
                        src={data.receipt}
                        style={{
                          height: "460px",
                          width: "380px",
                          marginBottom: "15px"
                        }}
                        alt="loading..."
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackModal;
