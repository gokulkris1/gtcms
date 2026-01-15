import React, { useEffect } from "react";
import facebook from "assets/images/facebook.svg";
import google from "assets/images/google.svg";
import twitter from "assets/images/twitter.svg";
import verysad from "assets/images/verysad.svg";
import sad from "assets/images/sad.svg";
import netural from "assets/images/netural.svg";
import happy from "assets/images/happy.svg";
import veryhappy from "assets/images/veryhappy.svg";
import arrow from "assets/images/arrow.svg";
import ReceiptWrapper from "./Receipt.style";
import appstore from "assets/images/appstore.svg";
import googleplay from "assets/images/googleplay.svg";
import downloads from "assets/images/download.svg";
import PDFImage from "assets/images/pdf.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Model from "components/common/Model";
import EmailModel from "./EmailModel";
import FeedBackModel from "./FeedBackModel";
import { PDFViewer } from "react-view-pdf/lib";
import { useMediaQuery } from "react-responsive";

export default function Receipt() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [receiptData, setReceiptData] = useState(null);

  const socialMedia = [
    { image: facebook, link: receiptData?.facebookLink },
    { image: twitter, link: receiptData?.twitterLink },
    { image: google, link: receiptData?.googleLink }
  ];
  const emoji = [
    { image: verysad, value: 1 },
    { image: sad, value: 2 },
    { image: netural, value: 3 },
    { image: happy, value: 4 },
    { image: veryhappy, value: 5 }
  ];
  const buttons = [
    { image: appstore, link: receiptData?.appStoreLink },
    { image: googleplay, link: receiptData?.playStoreLink }
  ];
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFeedBack, setIsOpenFeedback] = useState(false);
  const [email, setemail] = useState("");
  const [rating, setrating] = useState(0);
  const toggle = () => setIsOpen(!isOpen);
  const toggleFeedBack = () => setIsOpenFeedback(!isOpenFeedBack);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}user/receiptByName`, {
        receiptName: params.receiptname
      })
      .then(res => {
        setReceiptData(res.data.data);
      })
      .catch(error => {
        console.error("There was an error!", error.response);
      });

    setTimeout(() => {
      setIsOpen(true);
    }, 3000);
  }, []);

  const getEmail = email => {
    setemail(email);
  };
  // const download = (url) => {
  //   // console.log(e.target.href);
  //   // fetch(url, {
  //   //   method: "GET",
  //   //   headers: {},
  //   // })
  //   //   .then((response) => {
  //   //     response.arrayBuffer().then(function(buffer) {
  //   //       const url = window.URL.createObjectURL(new Blob([buffer]));
  //   //       const link = document.createElement("a");
  //   //       link.href = url;
  //   //       link.setAttribute("download", "image.png"); //or any other extension
  //   //       document.body.appendChild(link);
  //   //       link.click();
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });

  //   // fetch(url, {
  //   //   method: "GET",
  //   //   headers: {},
  //   // })
  //   //   .then((response) => {
  //   //     response.arrayBuffer().then(function(buffer) {
  //   //       const url = window.URL.createObjectURL(new Blob([buffer]));
  //   //       const link = document.createElement("a");
  //   //       link.href = url;
  //   //       link.download = "receipt.png";
  //   //       link.click();
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });

  //   axios({
  //     method: "get",
  //     url:
  //       "https://openxcell-development-public.s3.ap-south-1.amazonaws.com/greentill/development/receipt/004ea317-d74b-4b27-876b-847c9c5f5c43%20%281%29.png?response-content-disposition=attachment%3B%20filename%3Dtest&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221118T051452Z&X-Amz-SignedHeaders=host&X-Amz-Expires=899&X-Amz-Credential=AKIAW4UEQAQLZEALJKQL%2F20221118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=aeea078827c4ba7f7d7d9760fa3d12eae9cb512aa5e8ef3f277a9ca0d0081153",
  //     responseType: "arraybuffer",
  //   })
  //     .then((response) => {
  //       var link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(
  //         new Blob([response.data], { type: "application/octet-stream" })
  //       );
  //       link.download = "image.png";

  //       document.body.appendChild(link);

  //       link.click();
  //       setTimeout(function() {
  //         window.URL.revokeObjectURL(link);
  //       }, 200);
  //     })
  //     .catch((error) => {});
  // };

  return (
    <ReceiptWrapper>
      <div className="flex-y align-center overflow-auto position pt-12">
        <div className="pos-relative" style={{ width: "300px" }}>
          {/* download */}
          <a href={receiptData?.downloadUrl}>
            <img
              src={downloads}
              alt="download..."
              style={{
                position: "absolute",
                right:
                  !isTabletOrMobile &&
                  receiptData?.receiptPath?.split(".").pop() === "pdf"
                    ? 132
                    : 0
              }}
            />
          </a>
        </div>
        {/* receipt */}

        {receiptData?.receiptPath?.split(".").pop() === "pdf" ? (
          <div
            className="col pt-48"
            style={{ width: !!isTabletOrMobile ? "100%" : "60%" }}
          >
            <PDFViewer
              url={receiptData?.receiptPath}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <img src={receiptData?.receiptPath} alt="loading..." width={300} />
        )}
        {/* bottom section */}
        <div style={{ width: "300px" }}>
          <hr />
          {!!receiptData && (
            <div className="mtb-30">
              {receiptData?.facebookLink ||
                receiptData?.twitterLink ||
                (receiptData?.googleLink && (
                  <div className="fs-16 bold-text text-center pb-20">
                    You can reach us via
                  </div>
                ))}
              <div className="flex-x center">
                {socialMedia.map(socialMedia => {
                  return (
                    !!socialMedia.link && (
                      <img
                        src={socialMedia.image}
                        height={48}
                        alt="loading..."
                        className="mr-15 cursor-pointer"
                        onClick={() => {
                          window.open(socialMedia.link, "_blank");
                        }}
                      />
                    )
                  );
                })}
              </div>
            </div>
          )}
          <div style={{ background: "#F5F9FC" }}>
            <div className="ptb-30">
              <div className="fs-16 bold-text text-center pb-20">
                Give Us Feedback
              </div>
              <div className="flex-x center">
                {emoji.map(socialMedia => {
                  return (
                    <img
                      src={socialMedia.image}
                      height={32}
                      alt="loading..."
                      className="mr-15 cursor-pointer"
                      onClick={() => {
                        setrating(socialMedia.value);
                        toggleFeedBack();
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {!!receiptData?.advertisementImage && (
            <div
              role="button"
              className="cursor-pointer"
              onClick={() => {
                window.open(receiptData?.advertisementImageLink, "_blank");
              }}
            >
              <img
                src={receiptData?.advertisementImage}
                alt="loading..."
                width={300}
              />
            </div>
          )}
          <div className="mtb-30 text-center">
            {/* <div className="fs-14 regular-text plr-30 pb-20">
              Neque porro quisquam est qui dolorem i psum quia dolor sit amet
            </div> */}
            <div>
              <button
                className="button-style"
                onClick={() =>
                  window.open(
                    "https://www.surveymonkey.com/r/PXH5HDM",
                    "_blank"
                  )
                }
              >
                Start Survey <img src={arrow} alt="loading..." />
              </button>
            </div>
          </div>
          <hr />
          <div className="mtb-30 text-center">
            <div className="fs-20 bold-text pb-20" style={{ color: "#686868" }}>
              Download this App
            </div>
            <div className="flex-x center">
              {buttons.map(socialMedia => {
                return (
                  <img
                    src={socialMedia.image}
                    height={36}
                    onClick={() => {
                      window.open(socialMedia.link, "_blank");
                    }}
                    alt="loading..."
                    className="mr-15 cursor-pointer"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Model isOpen={isOpen} toggle={toggle}>
        <EmailModel
          setEmail={email => getEmail(email)}
          toggle={toggle}
          receiptName={params.receiptname}
        />
      </Model>
      <Model isOpen={isOpenFeedBack} toggle={toggleFeedBack}>
        <FeedBackModel
          toggle={toggleFeedBack}
          email={email}
          rating={rating}
          receiptId={receiptData?.receiptId}
        />
      </Model>
    </ReceiptWrapper>
  );
}
