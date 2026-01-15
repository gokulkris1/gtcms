import React from "react";

const UserModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.profileImage && (
            <div className="form-group">
              <label className="fs-16 medium-text">
                Profile Image&nbsp;:&nbsp;
              </label>
              <div>
                <div id="item_icon">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.profileImage}
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
        <div className="row">
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Id&nbsp;:&nbsp;</label>
              {data.userId ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Name&nbsp;:&nbsp;</label>
              {data.firstName ?? "-"} {data.lastName ?? "-"}
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
                Country Code&nbsp;:&nbsp;
              </label>
              {data.countryCode ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Phone Number&nbsp;:&nbsp;
              </label>
              {data.phoneNumber ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Country&nbsp;:&nbsp;</label>
              {data.country ?? "-" ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Currency&nbsp;:&nbsp;</label>
              {data.currency ?? "-" ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Register Type&nbsp;:&nbsp;
              </label>
              {data.registerType ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Total Points&nbsp;:&nbsp;
              </label>
              {data?.userTotalPoint ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                User Type&nbsp;:&nbsp;
              </label>
              {data.userType ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Facebook Id&nbsp;:&nbsp;
              </label>
              {data.facebookId ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Social Media Id&nbsp;:&nbsp;
              </label>
              {data.socialMediaId ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Google Id&nbsp;:&nbsp;
              </label>
              {data.googleId ?? "-"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">Status&nbsp;:&nbsp;</label>
              {data?.active ? "Active" : "Inactive"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Email Verified&nbsp;:&nbsp;
              </label>
              {data?.emailVerified ? "Yes" : "No"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Phone Verified&nbsp;:&nbsp;
              </label>
              {data?.phoneVerified ? "Yes" : "No"}
            </div>
          </div>
          <div className="col-6 pt-2">
            <div className="form-group">
              <label className="fs-16 medium-text">
                Notification&nbsp;:&nbsp;
              </label>
              {data?.notification ? "ON" : "OFF"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
