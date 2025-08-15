"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function VideoModalSection({
  title,
  description,
  thumbnailSrc,
  videoUrl,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-white" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
        </div>

        {/*Miniatura con botón de play */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative bg-gray-200 rounded-lg aspect-video overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={thumbnailSrc}
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button className="bg-primary text-white p-4 rounded-full hover:bg-primary-600 transition-colors shadow-lg">
                <Play className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/*Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center transition-opacity duration-300">
            <div className="relative w-full max-w-4xl px-4">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe
                  src={videoUrl}
                  title="Video demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
