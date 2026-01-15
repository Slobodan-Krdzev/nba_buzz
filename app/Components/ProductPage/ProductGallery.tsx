"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface JerseyGalleryProps {
  images: string[];
}

interface ImageDimensions {
  width: number;
  height: number;
  rowSpan: number;
}

const JerseyGallery: React.FC<JerseyGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

      if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
        // Scroll the div
        el.scrollTop += e.deltaY;
        e.preventDefault(); // prevent page scroll
      }
      // Otherwise, do nothing and let the page scroll
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: ImageDimensions[] = await Promise.all(
        images.map((src) => {
          return new Promise<ImageDimensions>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              const aspectRatio = img.height / img.width;
              // Base row span is 1, taller images (aspect ratio > 1.2) span 2 rows
              const rowSpan = aspectRatio > 1.2 ? 2 : 1;
              resolve({
                width: img.width,
                height: img.height,
                rowSpan,
              });
            };
            img.onerror = () => {
              resolve({ width: 1000, height: 1000, rowSpan: 1 });
            };
            img.src = src;
          });
        })
      );
      setImageDimensions(dimensions);
    };

    if (images.length > 0) {
      loadImageDimensions();
    }
  }, [images]);

  return (
    <div
      className="h-[122.5vh] w-full overflow-y-auto scrollbar-hidden "
      ref={galleryRef}
    >
      <div className="grid grid-cols-2 gap-4" style={{ gridAutoRows: 'minmax(200px, auto)' }}>
        {images.map((image, index) => {
          const dims = imageDimensions[index];
          const rowSpan = dims?.rowSpan || 1;
          
          return (
            <div
              key={index}
              className="relative"
              style={{ gridRow: `span ${rowSpan}` }}
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JerseyGallery;
