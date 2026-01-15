import React from "react";

const NotificationModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">ID&nbsp;:&nbsp;</label>
          {data?.notificationId ?? "-"}
        </div>
        <div className="d-flex">
          {data.image && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Survey Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.image}
                    style={{
                      height: "164px",
                      width: "164px",
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
          <label className="fs-16 medium-text">Title&nbsp;:&nbsp;</label>
          {data?.title ?? "-"}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Description&nbsp;:&nbsp;</label>
          {data?.description ?? "-"}
        </div>
      </form>
    </div>
  );
};

export default NotificationModal;
