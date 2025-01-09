"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageRow from "@/types/models/ImageRow";

interface ImageCarouselProps {
    carouselImages: ImageRow[];
    altText?: string;
}

const ImageCarousel = ({ carouselImages: images, altText = "Carousel image" }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Display the current image */}
            <Image
                src={images[currentIndex].image || "This photo is unavailable"}
                alt={altText}
                width={700}
                height={500}
                quality={100}
                className="rounded-lg object-cover"
                style={{
                    marginTop: '20px',
                }}
            />

            {/* Navigation buttons */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg"
                onClick={handlePrev}
            >
                ◀
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg"
                onClick={handleNext}
            >
                ▶
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex
                                ? "bg-blue-500"
                                : "bg-gray-400"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
