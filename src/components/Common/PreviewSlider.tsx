"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();

  const data = useAppSelector((state) => state.productDetailsReducer.value);

  const sliderRef = useRef(null);

  // Debug: Log the data to see what's available
  console.log("PreviewSlider data:", data);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div
      className={`preview-slider w-full h-screen z-[9999] inset-0 flex justify-center items-center bg-black/60 ${
        isModalPreviewOpen ? "fixed" : "hidden"
      }`}
    >
      <button
        onClick={() => closePreviewModal()}
        aria-label="button for close modal"
        className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 text-white hover:text-meta-5 z-10"
      >
        <svg
          className="fill-current"
          width="36"
          height="36"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 cursor-pointer z-10 text-white hover:text-gray-300"
          onClick={handlePrev}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.4082 20.0745C11.0909 20.3918 10.5764 20.3918 10.2591 20.0745L3.75909 13.5745C3.44178 13.2572 3.44178 12.7428 3.75909 12.4255L10.2591 5.92548C10.5764 5.60817 11.0909 5.60817 11.4082 5.92548C11.7255 6.24278 11.7255 6.75722 11.4082 7.07452L6.29519 12.1875H21.667C22.1157 12.1875 22.4795 12.5513 22.4795 13C22.4795 13.4487 22.1157 13.8125 21.667 13.8125H6.29519L11.4082 18.9255C11.7255 19.2428 11.7255 19.7572 11.4082 20.0745Z"
              fill="#FDFDFD"
            />
          </svg>
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 cursor-pointer z-10 text-white hover:text-gray-300"
          onClick={handleNext}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
              fill="#FDFDFD"
            />
          </svg>
        </button>
      </div>

      <Swiper ref={sliderRef} slidesPerView={1} spaceBetween={20} className="w-[90vw] max-w-[900px]">
        {(() => {
          // Get all available images from different possible sources
          const allImages = [
            ...(data?.previews || []),
            ...(data?.imgs?.previews || []),
            ...(data?.thumbnails || []),
            ...(data?.imgs?.thumbnails || []),
            // Single legacy fields some data models use
            ...(Array.isArray((data as any)?.images) ? (data as any).images : []),
            ...(typeof (data as any)?.img === 'string' && (data as any).img ? [(data as any).img] : [])
          ];
          
          // Remove duplicates and filter out empty values
          const uniqueImages = allImages
            .filter((image, index, self) => 
              image && self.findIndex(img => img === image) === index
            );

          console.log("All raw images:", allImages);
          console.log("Unique images found:", uniqueImages);
          console.log("Product data:", data);

          if (uniqueImages.length > 0) {
            return uniqueImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <Image
                    src={image}
                    alt={`${data?.title || 'Product'} - image ${index + 1}`}
                    width={450}
                    height={450}
                    className="object-contain"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`, e);
                      try {
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = "/images/placeholder.jpg";
                        if (!target.src.endsWith("placeholder.jpg")) {
                          target.src = fallback;
                        }
                      } catch {}
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded image: ${image}`);
                    }}
                  />
                </div>
              </SwiperSlide>
            ));
          } else {
            return (
              <SwiperSlide>
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/placeholder.jpg"
                    alt="No image available"
                    width={450}
                    height={450}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            );
          }
        })()}
      </Swiper>
    </div>
  );
};

export default PreviewSliderModal;
