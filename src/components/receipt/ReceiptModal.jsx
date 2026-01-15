import moment from "moment";
import React from "react";
import PDFImage from "../../assets/images/pdf.png";

const ReceiptModal = props => {
  const { data } = props;
  return (
    <div>
      <form>
        <div className="d-flex">
          {data.receiptImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Receipt Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  {data.receiptImage.split(".").pop() === "pdf" ? (
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
                      <a
                        target="_blank"
                        rel="noopener"
                        href={data.receiptImage}
                      >
                        View PDF ({data.receiptImage.split("/").pop()})
                      </a>
                    </div>
                  ) : (
                    <a target="_blank" rel="noopener" href={data.receiptImage}>
                      <img
                        className="top-header-profile-class view-image"
                        src={data.receiptImage}
                        style={{
                          height: "320px",
                          width: "260px",
                          marginBottom: "15px",
                          objectFit: "cover"
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
        <div className="row">
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Id&nbsp;:&nbsp;</label>
              {data.receiptId ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Shop Name&nbsp;:&nbsp;
              </label>
              {data.shopName ?? "-"}
            </div>
          </div>

          {data.shopImage ? (
            <div className="d-flex">
              <div className="col-6 pt-2">
                <div className="form-group">
                  <label className="fs-16 medium-text">
                    Shop Image&nbsp;:&nbsp;
                  </label>
                  <div>
                    <div id="item_icon">
                      <img
                        className="top-header-profile-class view-image"
                        src={data.shopImage}
                        style={{
                          height: "320px",
                          width: "320px",
                          marginBottom: "15px",
                          objectFit: "contain"
                        }}
                        alt="loading..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-6 pt-2"></div>
          )}

          <div className="col-6 pt-2"></div>

          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Branch Name&nbsp;:&nbsp;
              </label>
              {data.branchName ?? "-"}
            </div>
          </div>

          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Customer Name&nbsp;:&nbsp;
              </label>
              {data.customerName ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Email&nbsp;:&nbsp;</label>
              {data.email ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Phone Number&nbsp;:&nbsp;
              </label>
              {data.phone ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Date&nbsp;:&nbsp;</label>
              {data.createdAt
                ? moment(data.createdAt).format("MM-DD-YYYY")
                : "-"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReceiptModal;
