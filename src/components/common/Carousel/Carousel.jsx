import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="indicators-carousel"
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-7xl"
      data-carousel="static"
    >
      {/* Carousel wrapper */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        {/* Item 1 */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
            currentSlide === 0 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              alt="Slide 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
        {/* Item 2 */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
            currentSlide === 1 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              alt="Slide 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
        {/* Item 3 */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
            currentSlide === 2 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              alt="Slide 3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
        {/* Item 4 */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
            currentSlide === 3 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              alt="Slide 4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
        {/* Item 5 */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
            currentSlide === 4 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              alt="Slide 5"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 rtl:space-x-reverse bottom-6 left-1/2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-3 bg-white shadow-lg"
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-current={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 start-4 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group focus:outline-none shadow-lg hover:shadow-xl"
        onClick={prevSlide}
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 end-4 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group focus:outline-none shadow-lg hover:shadow-xl"
        onClick={nextSlide}
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
