"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/automate_carousel.jpg",
    text: "Automatiza el cumplimiento de la Ley 2365",
  },
  {
    src: "/confidential_carousel.jpg",
    text: "Confidencialidad garantizada para tu equipo",
  },
  {
    src: "/culture_carousel.jpg",
    text: "Fortalece la cultura organizacional con empatía",
  },
  {
    src: "/prevention_carousel.jpg",
    text: "Prevención efectiva, sin fricciones ni juicios",
  },
];

export const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const pauseAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (!hasMounted) return null;

  return (
    <div
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Contenedor de slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-full">
            <Image
              src={slide.src}
              alt={`Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent flex items-center justify-center px-4 z-10">
              <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4x1 font-semibold text-center drop-shadow-lg max-w-[80%] leading-snug">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full hover:bg-opacity-60 transition"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full hover:bg-opacity-60 transition"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white" : "bg-black/20"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
