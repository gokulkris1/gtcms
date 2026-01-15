import React from "react";
import Button from "components/button/Button";
import Api from "api/Api";
import { withRouter } from "react-router";

const deleteModal = props => {
  let data = props.data;
  const deleteAdmin = () => {
    Api("GET", `class-info/delete/${props.data.id}`)
      .then(res => {
        if (res.data.status) {
          props.toggle();
        }
      })
      .catch(err => {
        props.toggle();
      });
  };

  return (
    <div className="wp-100">
      <div
        className="fs-15 demi-bold-text cursor-pointer float-right"
        onClick={() => props.toggle()}
      >
        <i className="fa fa-times"></i>
      </div>
      <div className=" fs-20 font-weight-bolder">Delete confirmation</div>
      <hr />
      <div className="row">
        <div className="col-12 pt-1">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              {`Are you sure you want to delete this class ${data.name}?`}
            </div>
            <div className="col-12 pt-4 d-flex justify-content-end">
              <Button
                className="c-btn c-success mr-10"
                style={{ minWidth: "50px" }}
                onClick={deleteAdmin}
              >
                <div className="fs-14  ">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </div>
              </Button>

              <Button
                style={{ minWidth: "50px" }}
                className="c-btn c-danger mr-10"
                onClick={() => props.toggle()}
              >
                <div>
                  <div className="fs-14" id="hi">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(deleteModal);
