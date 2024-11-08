import { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const sliderRef = useRef(null);

  // Cấu hình cho slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    pauseOnHover: true,
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {featureImageList && featureImageList.length > 0 ? (
        <>
          <Slider {...settings} ref={sliderRef}>
            {featureImageList.map((slide, index) => (
              <div key={index} className="max-h-[60vh] flex items-center justify-center">
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>

          {/* Nút Previous ẩn trên màn hình nhỏ */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          {/* Nút Next ẩn trên màn hình nhỏ */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default HomeBanner;
