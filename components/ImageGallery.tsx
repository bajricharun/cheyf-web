"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Grid } from "lucide-react";
import { Button } from "./ui/Button";

interface ImageGalleryProps {
  images: string[];
  propertyName: string;
}

export function ImageGallery({ images, propertyName }: ImageGalleryProps) {
  const [showModal, setShowModal] = useState(false);

  // Fallback if no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[50vh] bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // If only 1 image, just show it large
  if (images.length === 1) {
    return (
      <div className="relative w-full h-[50vh] rounded-xl overflow-hidden">
        <Image
          src={images[0]}
          alt={`${propertyName} image 1`}
          fill
          priority
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  // 5 or more images layout
  const displayImages = images.slice(0, 5);
  
  return (
    <>
      <div className="relative w-full h-[50vh] lg:h-[60vh] rounded-2xl overflow-hidden mb-8 gap-2 flex flex-col md:flex-row">
        {/* Main large image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer overflow-hidden" onClick={() => setShowModal(true)}>
          <Image
            src={displayImages[0]}
            alt={`${propertyName} cover`}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* 4 grid images on the right */}
        <div className="hidden md:grid w-1/2 h-full grid-cols-2 grid-rows-2 gap-2">
          {displayImages.slice(1, 5).map((src, idx) => (
            <div 
              key={idx} 
              className="relative w-full h-full cursor-pointer overflow-hidden"
              onClick={() => setShowModal(true)}
            >
              <Image
                src={src}
                alt={`${propertyName} image ${idx + 2}`}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Mobile secondary image (if < md) */}
        <div className="md:hidden relative w-full h-1/2 cursor-pointer overflow-hidden" onClick={() => setShowModal(true)}>
          {displayImages[1] && (
            <Image
              src={displayImages[1]}
              alt={`${propertyName} image 2`}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Show all photos button */}
        <Button 
          variant="secondary" 
          className="absolute bottom-4 right-4 z-10 gap-2 font-semibold shadow-md  md:flex"
          onClick={() => setShowModal(true)}
        >
          <Grid className="w-4 h-4" />
          Show all photos
        </Button>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-6 sticky top-0 py-4 z-10">
              <h2 className="text-2xl font-semibold capitalize">Photos of {propertyName}</h2>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowModal(false)}
                className="rounded-full shadow-sm bg-background hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {images.map((src, idx) => (
                <div 
                  key={idx} 
                  className={`relative w-full rounded-lg overflow-hidden ${
                    idx % 3 === 0 ? "col-span-1 md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${propertyName} ${idx + 1}`}
                    fill
                    priority
                    className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
