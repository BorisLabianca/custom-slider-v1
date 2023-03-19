import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slidesConstainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-in-out 0.5s",
};
const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
  borderRadius: "10px",
};

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ImageSlider = ({ slides, parentWidth }) => {
  const timeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderStyles = { height: "100%", width: "100%", position: "relative" };
  const getSlideStyles = (slideIndex) => {
    return {
      ...slideStyles,
      backgroundImage: `url(${slides[slideIndex].image})`,
      width: `${parentWidth}px`,
    };
  };
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "20px",
    backgroundColor: "white",
    display: "flex",
    padding: "5px",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "20px",
    backgroundColor: "white",
    display: "flex",
    padding: "5px",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    cursor: "pointer",
  };
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const dotStyles = (slideIndex) => {
    const color = slideIndex === currentIndex ? "blue" : "black";
    const fontSize = slideIndex === currentIndex ? "70px" : "50px";
    return {
      fontSize,
      color,
      cursor: "pointer",
      fontWeight: "900",
      transition: "ease-in-out 1s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30px",
      height: "30px",
      marginTop: "15px",
    };
  };
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const getSlidesConstainerStyles = () => ({
    ...slidesConstainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    overflow: "hidden",
  });
  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 2000);
    return () => {
      clearTimeout(timeRef.current);
    };
  }, [goToNext]);

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious}>
        <FaChevronLeft />
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        <FaChevronRight />
      </div>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesConstainerStyles()}>
          {slides.map((_, slideIndex) => {
            return (
              <div key={slideIndex} style={getSlideStyles(slideIndex)}></div>
            );
          })}
        </div>
      </div>

      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => {
          return (
            <div
              key={slide.title}
              style={dotStyles(slideIndex)}
              onClick={() => {
                goToSlide(slideIndex);
              }}
            >
              ・
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
