import React, { useEffect, useState } from "react";
import UserWrapper from "./user.style";
import PageTitle from "components/common/PageTitle";
import { connect } from "react-redux";
import Api from "api/Api";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import CouponForm from "components/coupon/CouponForm";
import moment from "moment";

const CouponEdit = props => {
  const [editedData, setEditedData] = useState(null);

  const [loading, setLoading] = useState(false);
  const hasParam = props.match.params.hasOwnProperty("id");
  const id = props.match.params.id;

  const toaster = useRef();

  useEffect(() => {
    setEditedData(props.location.state);
  }, [props]);

  const submitFormHandler = (data, action) => {
    if (action === "add") {
      setLoading(true);
      const body = {
        categoryId: data.category.value,
        couponCode: data.couponCode,
        freeText: data.discount,
        fromDate:
          moment(data.dates.startDate).format("YYYY-MM-DD") + "T18:30:00.000Z",
        storeName: data.storeName,
        toDate:
          moment(data.dates.endDate).format("YYYY-MM-DD") + "T18:30:00.000Z",
        storeLogo: data.storeLogos,
        timeZone: "Asia/Kolkata",
        description: data.description,
        discountType: data.discountType,
        currency:
          data.discountType === "AMOUNT" ? data.currency.value : undefined,
        backgroundImage: data.backgroundImages,
        country: data?.country?.value,
        couponLink: data?.couponLink
      };
      const formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.post("/admin/coupon/add", formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/coupon");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    } else if (action === "edit") {
      setLoading(true);
      const body = {
        couponId: id,
        categoryId: data.category.value,
        couponCode: data.couponCode,
        file: data.barcodes,
        freeText: data.discount,
        fromDate:
          moment(data.dates.startDate).format("YYYY-MM-DD") + "T18:30:00.000Z",
        storeName: data.storeName,
        toDate:
          moment(data.dates.endDate).format("YYYY-MM-DD") + "T18:30:00.000Z",
        storeLogo: data.storeLogos,
        timeZone: "Asia/Kolkata",
        description: data.description,
        discountType: data.discountType,
        currency: data.currency.value,
        backgroundImage: data.backgroundImages,
        country: data?.country?.value,
        couponLink: data?.couponLink
      };
      const formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }
      setLoading(true);
      Api.put("/admin/coupon/edit", formData)
        .then(response => {
          if (response.data.status) {
            if (toaster.current) toaster.current.success(response.data.message);
            setTimeout(() => {
              props.history.push("/coupon");
            }, 1000);
          } else {
            setLoading(false);
            if (toaster.current) toaster.current.error(response.data.message);
          }
        })
        .catch(error => {
          setLoading(false);
          if (toaster.current) toaster.current.error(error);
        });
    }
  };

  return (
    <UserWrapper {...props}>
      <div className="pos-relative">
        <PageTitle
          title="sidebar.coupon"
          className="plr-15"
          breadCrumb={[
            {
              name: "sidebar.dashboard"
            },
            {
              name: "sidebar.coupon"
            },
            {
              name: hasParam ? "action.edit" : "action.add"
            }
          ]}
        />
        <div
          className="back-icon fs-15 demi-bold-text cursor-pointer"
          onClick={() => props.history.push("/coupon")}
        >
          <i className="fas fa-step-backward"></i> Backward
        </div>
      </div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> {hasParam ? "Edit" : "Add"}{" "}
              Coupon
            </div>
          </div>
          <div className="roe-card-body">
            <CouponForm
              onSubmit={submitFormHandler}
              editedData={editedData}
              action={hasParam ? "edit" : "add"}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <Toaster ref={toaster} />
    </UserWrapper>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default connect(mapStateToProps, null)(CouponEdit);
