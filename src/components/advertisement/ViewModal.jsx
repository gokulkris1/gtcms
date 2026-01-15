import React from "react";

const ViewModal = props => {
  const { data } = props;

  return (
    <div>
      <form className="fill-width">
        <div className="form-group">
          <label className="fs-16 medium-text">Email&nbsp;:&nbsp;</label>
          {data.email}
        </div>
        <div>
          {data.advertisementResDTOSet && data.fileType === "IMAGE" && (
            <div className="form-group">
              <label className="fs-16 medium-text">Banner&nbsp;:&nbsp;</label>
              <div className="flex space-between" style={{ flexFlow: "wrap" }}>
                {data.advertisementResDTOSet.length > 0 &&
                  data.advertisementResDTOSet.map(image => {
                    return (
                      <div id="item_icon">
                        <img
                          className="top-header-profile-class view-image"
                          src={image.advertisement}
                          style={{
                            height: "200px",
                            width: "320px",
                            marginBottom: "15px"
                          }}
                          alt="loading..."
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {!!data.advertisementResDTOSet.length && data.fileType === "TEXT" && (
            <table class="table" style={{ marginTop: "25px" }}>
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. no</th>
                  <th scope="col">Text</th>
                </tr>
              </thead>
              {!!data.advertisementResDTOSet.length &&
                data.advertisementResDTOSet.map((result, i) => {
                  return (
                    <tbody>
                      <tr className="text-center">
                        <th scope="row">{i + 1}</th>
                        <td>
                          <div>
                            {result.advertisement ? result.advertisement : "--"}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          )}
        </div>
      </form>
    </div>
  );
};

export default ViewModal;
