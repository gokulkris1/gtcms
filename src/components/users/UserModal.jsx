import React from "react";

const UserModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Email&nbsp;:&nbsp;</label>
          {data.email}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Password&nbsp;:&nbsp;</label>
          {data.passwordField}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data.storeName}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Branch Name&nbsp;:&nbsp;</label>
          {data.branchName}
        </div>
      </form>
    </div>
  );
};

export default UserModal;
