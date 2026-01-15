import axios from "axios";
import React from "react";
import { useState } from "react";
import VerySad from "./Emoji/VerySad";
import Sad from "./Emoji/Sad";
import Nice from "./Emoji/Nice";
import Good from "./Emoji/Good";
import Best from "./Emoji/Best";
import { useEffect } from "react";
import { useRef } from "react";
import Toaster from "components/common/Toaster";
import enhancer from "./feedbackValidator";
import { compose } from "redux";

const intialEmoji = [
  {
    value: 1,
    isSelected: false
  },
  {
    value: 2,
    isSelected: false
  },
  {
    value: 3,
    isSelected: false
  },
  {
    value: 4,
    isSelected: false
  },
  {
    value: 5,
    isSelected: false
  }
];

function FeedBackModel(props) {
  let {
    email,
    rating,
    receiptId,
    toggle,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount
  } = props;
  const toaster = useRef();
  const [showEmail, setShowEmail] = useState(false);
  const [emoji, setemoji] = useState(intialEmoji);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setShowEmail(!email);
    props.setFieldValue("email", email);
  }, []);

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span
          className={props.class ? props.class : "error-msg"}
          style={props.style}
        >
          {errors[field1]}
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  const onSubmit = values => {
    setLoader(true);
    const ratings = emoji.filter(res => res.isSelected);
    const body = {
      comment: values.feedback,
      email: values.email,
      rating: ratings[0].value,
      receiptId: receiptId,
      feedbackFrom: "NATIVE_CAMERA"
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}user/feedback`, body)
      .then(res => {
        toaster.current.success(res.data.message);
        if (!!res.data.status) {
          setLoader(false);
          setTimeout(() => {
            toggle();
          }, 1000);
        }
      })
      .catch(error => {
        if (toaster.current) {
          if (error?.response?.data?.message) {
            toaster.current.error(error?.response?.data?.message);
          } else {
            toaster.current.error(error.message);
          }
        }
        setLoader(false);
      });
  };

  useEffect(() => {
    const Data = emoji.map(res => {
      if (res.value === rating) {
        return {
          ...res,
          isSelected: true
        };
      } else {
        return {
          ...res
        };
      }
    });
    setemoji([...Data]);
  }, [rating]);

  return (
    <div>
      <div>
        <div className="text-center">
          <b>Your feedback is important for us.</b>
        </div>
        <div className="flex-x center mt-15">
          {emoji.map((socialMedia, i) => {
            return socialMedia.value === 1 ? (
              <VerySad
                fill={socialMedia.isSelected ? "#4CBB17" : "#AEAEAE"}
                className="mr-15"
                onClick={() => {
                  const Data = emoji.map(res => {
                    if (res.value === i + 1) {
                      return {
                        ...res,
                        isSelected: true
                      };
                    } else {
                      return {
                        ...res,
                        isSelected: false
                      };
                    }
                  });
                  setemoji([...Data]);
                }}
              />
            ) : socialMedia.value === 2 ? (
              <Sad
                fill={socialMedia.isSelected ? "#4CBB17" : "#AEAEAE"}
                className="mr-15"
                onClick={() => {
                  const Data = emoji.map(res => {
                    if (res.value === i + 1) {
                      return {
                        ...res,
                        isSelected: true
                      };
                    } else {
                      return {
                        ...res,
                        isSelected: false
                      };
                    }
                  });
                  setemoji([...Data]);
                }}
              />
            ) : socialMedia.value === 3 ? (
              <Nice
                fill={socialMedia.isSelected ? "#4CBB17" : "#AEAEAE"}
                className="mr-15"
                onClick={() => {
                  const Data = emoji.map(res => {
                    if (res.value === i + 1) {
                      return {
                        ...res,
                        isSelected: true
                      };
                    } else {
                      return {
                        ...res,
                        isSelected: false
                      };
                    }
                  });
                  setemoji([...Data]);
                }}
              />
            ) : socialMedia.value === 4 ? (
              <Good
                fill={socialMedia.isSelected ? "#4CBB17" : "#AEAEAE"}
                className="mr-15"
                onClick={() => {
                  const Data = emoji.map(res => {
                    if (res.value === i + 1) {
                      return {
                        ...res,
                        isSelected: true
                      };
                    } else {
                      return {
                        ...res,
                        isSelected: false
                      };
                    }
                  });
                  setemoji([...Data]);
                }}
              />
            ) : (
              <Best
                fill={socialMedia.isSelected ? "#4CBB17" : "#AEAEAE"}
                onClick={() => {
                  const Data = emoji.map(res => {
                    if (res.value === i + 1) {
                      return {
                        ...res,
                        isSelected: true
                      };
                    } else {
                      return {
                        ...res,
                        isSelected: false
                      };
                    }
                  });
                  setemoji([...Data]);
                }}
              />
            );
          })}
        </div>
        <form
          className="mt-20"
          onSubmit={e => {
            e.preventDefault();
            let { values, isValid, handleSubmit } = props;
            if (isValid) {
              onSubmit(values);
            }
            handleSubmit();
          }}
        >
          {!!showEmail && (
            <div className="form-group">
              <label className="fs-16 medium-text">Email</label>
              <input
                type="email"
                className="form-control react-form-input"
                name="email"
                id="exampleEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"

                // required
              />
              <Error field="email" />
            </div>
          )}
          <div className="form-group">
            <label className="fs-16 medium-text">Feedback</label>
            <textarea
              className="form-control react-form-input"
              placeholder="Enter your Feedback"
              // required
              name="feedback"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="feedback" />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="c-btn form-button fs-16 demi-bold-text"
              style={{
                background: "#4CBB17",
                border: "none",
                padding: "7px 50px",
                height: 32
              }}
            >
              {loader ? (
                <div className="lds-ring loder-middle1">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>

      <Toaster ref={toaster} />
    </div>
  );
}

export default compose(enhancer)(FeedBackModel);
