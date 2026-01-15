import React from "react";

const View = props => {
  const { data } = props;

  return (
    <div className="pa-8">
      <div className="flex flex-column fill-width">
        <div className="text-center ptb-20">
          <strong className="fs-20">
            {data?.title ? data?.title : "Title"}
          </strong>
          <div>
            {data?.titleImageList?.map(el => (
              <a href={el?.imageLink} target="_blank">
                {" "}
                <img
                  src={el?.image}
                  className="object-cover"
                  style={{ width: "100%", height: "auto" }}
                />{" "}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-column pa-12">
          {data?.body1 || data?.body2 || data?.body3 ? (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: data?.body1 }}
                className="ptb-10"
              ></div>
              <div
                dangerouslySetInnerHTML={{ __html: data?.body2 }}
                className="ptb-10"
              ></div>
              <div
                dangerouslySetInnerHTML={{ __html: data?.body3 }}
                className="ptb-10"
              ></div>
            </>
          ) : (
            <div className="ptb-10">Body</div>
          )}
        </div>
        <div className="pa-16">
          <div
            dangerouslySetInnerHTML={{
              __html: data?.footer ? data?.footer : "Footer"
            }}
          ></div>
          <div>
            {data?.footerImageList?.map(el => (
              <a href={el?.imageLink} target="_blank">
                {" "}
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px"
                  }}
                  src={el?.image}
                  className="object-cover"
                />{" "}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
