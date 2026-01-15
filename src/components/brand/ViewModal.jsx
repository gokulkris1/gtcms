import React from "react";
import moment from "moment";

const viewModal = props => {
  let data = props.data;
  let date = props.data.class_date.split("-");
  let time = props.data.class_time.split(":");

  let latestDate = new Date();

  latestDate.setUTCFullYear(date[0]);
  latestDate.setUTCMonth(date[1] - 1);
  latestDate.setUTCDate(date[2]);
  latestDate.setUTCHours(time[0]);
  latestDate.setUTCMinutes(time[1]);
  latestDate.setUTCSeconds(time[2]);

  return (
    <div className="wp-100">
      <div
        className="fs-15 demi-bold-text cursor-pointer float-right"
        onClick={() => props.toggle()}
      >
        <i className="fa fa-times"></i>
      </div>
      <div className=" fs-20 font-weight-bolder">Class information</div>
      <hr />
      <div className="row d-flex justify-content-around">
        {data.chef.profile_photo && (
          <div className="pt-4">
            <div>
              <div style={{ fontWeight: "bolder", textAlign: "left" }}>
                Profile Image
              </div>
              <img
                src={data.chef.profile_photo}
                alt=""
                height="150px"
                width="150px"
                style={{ borderRadius: "6%" }}
              />
            </div>
          </div>
        )}
        {data.image && (
          <div className="pt-4">
            <div>
              <div style={{ fontWeight: "bolder", textAlign: "left" }}>
                Class Image
              </div>
              <img
                src={data.image}
                alt=""
                height="150px"
                width="150px"
                style={{ borderRadius: "6%" }}
              />
            </div>
          </div>
        )}
        {!data.video_link && (
          <div className="pt-4">
            <div>
              <div style={{ fontWeight: "bolder", textAlign: "left" }}>
                Class video
              </div>
              <video
                src={data.video_name}
                controls="controls"
                style={{
                  width: "200px",
                  borderRadius: "4%",
                  height: "150px",
                  background: "#404040"
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Chef name
            </div>
            <div className="text-left">{`${data.chef.name}`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>Email</div>
            <div className="text-left">{`${data.chef.email}`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>Name</div>
            <div className="text-left">{`${data.name}`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Duration
            </div>
            <div className="text-left">{`${data.duration} Mins`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Date of class
            </div>
            <div className="text-left">{`${moment(latestDate).format(
              "MM/DD/YYYY"
            )}`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Time of class
            </div>
            <div className="text-left">{`${moment(latestDate).format(
              "hh:mm:ss"
            )}`}</div>
          </div>
        </div>{" "}
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>Type</div>
            <div className="text-left">{`${data.class_type
              .charAt(0)
              .toUpperCase() + data.class_type.slice(1)}`}</div>
          </div>
        </div>
        <div className="col-6 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Created date
            </div>
            <div className="text-left">{`${moment(data.created_at).format(
              "MM/DD/YYYY "
            )}`}</div>
          </div>
        </div>
        <div className="col-12 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Instructions
            </div>
            <table class="table" style={{ marginTop: "25px" }}>
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. no</th>
                  <th scope="col">Instruction</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </thead>
              {data.class_instructions.length > 0 &&
                data.class_instructions.map((result, i) => {
                  return (
                    <tbody>
                      <tr className="text-center">
                        <th scope="row">{i + 1}</th>
                        <td>{result.text}</td>
                        <td>{result.timestamp}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
        <div className="col-12 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Ingredients
            </div>
            <table class="table" style={{ marginTop: "25px" }}>
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. no</th>
                  <th scope="col">Measurement</th>
                  <th scope="col">Food</th>
                </tr>
              </thead>
              {data.class_ingredients.length > 0 &&
                data.class_ingredients.map((result, i) => {
                  return (
                    <tbody>
                      <tr className="text-center">
                        <th scope="row">{i + 1}</th>
                        <td>{result.measurement}</td>
                        <td>{result.ingredient.name}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
        <div className="col-12 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Description
            </div>
            <div className="text-left">{`${data.description}`}</div>
          </div>
        </div>
        {data.video_link && (
          <div className="col-12 pt-4">
            <div>
              <div style={{ fontWeight: "bolder", textAlign: "left" }}>
                Link
              </div>
              <div>
                <a
                  href={`${data.video_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Click to view
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="col-12 pt-4">
          <div>
            <div style={{ fontWeight: "bolder", textAlign: "left" }}>
              Instructions
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.instructions }} />
          </div>
        </div>
        <table class="table" style={{ marginTop: "25px" }}>
          <thead>
            <tr className="text-center">
              <th scope="col">Sr. no</th>
              <th scope="col">Meal type</th>
              <th scope="col">Meal icon</th>
            </tr>
          </thead>
          {data.class_meal_icons.length > 0 &&
            data.class_meal_icons.map((result, i) => {
              return (
                <tbody>
                  <tr className="text-center">
                    <th scope="row">{i + 1}</th>
                    <td>
                      {result.meal_icon.meal_type
                        ? result.meal_icon.meal_type
                        : "--"}
                    </td>
                    <td>
                      {
                        <img
                          src={result.meal_icon.image}
                          height="25px"
                          width="25px"
                          alt=""
                        ></img>
                      }
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default viewModal;
