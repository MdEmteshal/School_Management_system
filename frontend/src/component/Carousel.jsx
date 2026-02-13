import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { backendUrl } from "../App";
import axios from "axios";

const FullScreenCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [getimage, setGetImage] = useState([]);

  const prevSlide = () => {
    if (getimage.length === 0) return;
    setCurrentIndex(
      currentIndex === 0 ? getimage.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    if (getimage.length === 0) return;
    setCurrentIndex(
      currentIndex === getimage.length - 1 ? 0 : currentIndex + 1
    );
  };

  // 🔥 AUTO SLIDE (runs after images load)
  useEffect(() => {
    if (getimage.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === getimage.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [getimage.length]); // ⭐ IMPORTANT

  const handleGetCarouselImage = async () => {
    try {
      const result = await axios.get(
        backendUrl + "/admin/getcarousel",
        { withCredentials: true }
      );
      setGetImage(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCarouselImage();
  }, []);

  return (
    <div
      className="
        relative w-full
        h-56 sm:h-72 md:h-96 lg:h-96
        overflow-hidden
      "
    >
      {/* ✅ Show only active image */}
      {getimage.length > 0 && (
        <img
          src={getimage[currentIndex]?.imageUrl}
          alt={`slide-${currentIndex}`}
          className="w-full h-full object-cover"
        />
      )}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full z-20 hover:bg-black/60"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full z-20 hover:bg-black/60"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center z-20">
        {getimage.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 mx-1 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenCarousel;
