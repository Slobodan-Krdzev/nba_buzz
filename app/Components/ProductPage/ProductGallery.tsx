'use client'
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface JerseyGalleryProps {
  images: string[];
}

const JerseyGallery: React.FC<JerseyGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

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

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  
    return (
    <div className="h-[100vh] w-full overflow-y-auto scrollbar-hidden" ref={galleryRef} >
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image src={image} alt={`Jersey ${index + 1}`} width={1000} height={1000} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JerseyGallery;