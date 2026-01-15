import React, { useEffect } from "react";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import EmailTemplateForm from "./EmailTemplateForm";

const EmailTemplate = props => {
  const { isStore, storeId } = props;

  useEffect(() => {
    if (isStore && !storeId) {
      props.history.push("/store");
    }
  }, [isStore, storeId]);

  return (
    <>
      <PageTitle
        title={`Email Template (${props.storeName})`}
        className="plr-15"
        breadCrumb={[
          {
            name: !isStore ? "sidebar.dashboard" : "sidebar.storeDashboard"
          },
          {
            name: "sidebar.emailTemplate"
          }
        ]}
      />
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">Email Template</div>
          </div>
          <div className="roe-card-body">
            <EmailTemplateForm {...props} />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    ...state.storeID
  };
};

export default connect(mapStateToProps, null)(EmailTemplate);
