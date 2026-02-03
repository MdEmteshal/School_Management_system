// import React, { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const images = [
//   "https://picsum.photos/1920/600?random=1",
//   "https://picsum.photos/1920/600?random=2",
//   "https://picsum.photos/1920/600?random=3",
// ];

// const FullScreenCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
//   };

//   const nextSlide = () => {
//     setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
//   };

//   return (
//     <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
//       {/* Background Layer for z-index fix */}
//       <div className="absolute inset-0 -z-10">
//         <img
//           src={images[currentIndex]}
//           alt={`slide-${currentIndex}`}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Carousel Image */}
//       <img
//         src={images[currentIndex]}
//         alt={`slide-${currentIndex}`}
//         className="w-full h-full object-cover"
//       />

//       {/* Left/Right Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-20"
//       >
//         <FaChevronLeft size={20} />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-20"
//       >
//         <FaChevronRight size={20} />
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-4 w-full flex justify-center z-20">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-3 w-3 rounded-full mx-1 ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FullScreenCarousel;

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://picsum.photos/1920/800?random=1",
  "https://picsum.photos/1920/800?random=2",
  "https://picsum.photos/1920/800?random=3",
];

const FullScreenCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
   <div
  className="
    relative w-full
    h-56        /* ~224px (mobile) */
    sm:h-72     /* ~288px */
    md:h-96     /* ~384px */
   lg:h-120
    overflow-hidden
  "
>

      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="w-full h-full object-cover"
      />

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
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 mx-1 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenCarousel;


