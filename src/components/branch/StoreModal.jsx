import React from "react";

const StoreModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="fs-16 medium-text">Branch Name&nbsp;:&nbsp;</label>
          {data.branchName}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Store Name&nbsp;:&nbsp;</label>
          {data.storeName}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Address&nbsp;:&nbsp;</label>
          {data.address}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">City&nbsp;:&nbsp;</label>
          {data.city}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">State&nbsp;:&nbsp;</label>
          {data.state}
        </div>
        <div className="form-group">
          <label className="fs-16 medium-text">Country&nbsp;:&nbsp;</label>
          {data.country}
        </div>
      </form>
    </div>
  );
};

export default StoreModal;
