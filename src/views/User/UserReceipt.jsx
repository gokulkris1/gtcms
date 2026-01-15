import React, { useEffect } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import ReceiptTable from "components/receipt/ReceiptTable";

const UserReceipt = props => {
  const { isStore, storeId } = props;

  useEffect(() => {
    if (isStore && !storeId) {
      props.history.push("/store");
    }
  }, [isStore, storeId]);

  return (
    <UserWrapper {...props}>
      <div className="pos-relative">
        <PageTitle
          title={"sidebar.user"}
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.user"
            },
            {
              name: "sidebar.receiptlist"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() =>
            !isStore
              ? props.history.push("/user")
              : props.history.push("/store/user")
          }
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="user-tbl">
        <ReceiptTable isStore={isStore} {...props} />
      </div>
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    ...state.storeID
  };
};

export default connect(mapStateToProps, null)(UserReceipt);
