import React from "react";

const ViewModal = props => {
  const { data } = props;

  return (
    <div>
      <form>
        <div className="d-flex">
          {data.sliderImage && (
            <div className="form-group">
              <div>
                <div id="item_icon pa-8">
                  <img
                    className="top-header-profile-class view-image"
                    src={data.sliderImage}
                    height="100%"
                    width="100%"
                    alt="loading..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-6 pt-2">
          <div className="form-group">
            <label className="fs-16 medium-text">
              Slider Link&nbsp;:&nbsp;
            </label>
            <div className="breakWord">{data.sliderLink ?? "-"}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
