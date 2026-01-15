import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";

const WarrantyModal = props => {
  const { data } = props;
  return (
    <div>
      <form>
        <>
          {!!data.length ? (
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {data.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <a target="_blank" rel="noopener" href={image.path}>
                    <img
                      alt="banner"
                      // src={PDFImage}
                      src={image.path}
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <span className="flex flex-1 justify-content-center mtb-20">
              No Warranty Cards available for this receipt.
            </span>
          )}
        </>
      </form>
    </div>
  );
};

export default WarrantyModal;
