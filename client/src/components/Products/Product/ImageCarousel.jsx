import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageCarousel = ({thumbnails, curIndex, setCurIndex}) => {

    const handlePrevious = () => {
        setCurIndex((prevIndex) => 
            prevIndex === 0? thumbnails.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurIndex((prevIndex) => 
            prevIndex === thumbnails.length-1? 0 : prevIndex + 1
        );
    }

    return (
        <div className="flex w-full items-center justify-center relative">
            <button className="bg-none border-none" onClick={handlePrevious}><FiChevronLeft /></button>
            <div>
                <img src={thumbnails[curIndex]} alt={`Thumbnail ${curIndex}`} className="w-[500px] h-[500px] object-cover"></img>
            </div>
            <button className="bg-none border-none" onClick={handleNext}><FiChevronRight /></button>
        </div>
    );
}

export default ImageCarousel