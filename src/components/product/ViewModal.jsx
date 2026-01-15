import React from "react";

const ViewModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.image && (
            <div className="form-group">
              <label className="fs-16 medium-text">Image&nbsp;:&nbsp;</label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.image}
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
          <label className="fs-16 medium-text">ID&nbsp;:&nbsp;</label>
          {data.id ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Product ID&nbsp;:&nbsp;</label>
          {data.productId ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Name&nbsp;:&nbsp;</label>
          {data.name ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Category&nbsp;:&nbsp;</label>
          {data.category ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Country&nbsp;:&nbsp;</label>
          {data.country ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Currency&nbsp;:&nbsp;</label>
          {data.currencyCode ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Amount&nbsp;:&nbsp;</label>
          {data.amount ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Points&nbsp;:&nbsp;</label>
          {data.points ?? "-"}
        </div>
        <div className="form-group flex-y">
          <label className="fs-16 medium-text">Description&nbsp;:&nbsp;</label>
          {data.description === "" ? "-" : data.description}
        </div>
        <div className="form-group flex-y">
          <label className="fs-16 medium-text">Disclosure&nbsp;:&nbsp;</label>
          {data.disclosure === "" ? (
            <div>-</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data.disclosure }} />
          )}
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
