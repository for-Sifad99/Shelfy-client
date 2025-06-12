import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
    const [next, setNext] = useState(0);
    let ref = useRef();

    // Json data for slider background image
    const sliderBGs = [
        {
            "alt": "Banner-1 Picture",
            "src": "https://i.postimg.cc/9XTbxCg8/banner1.png"
        },
        {
            "alt": "Banner-3 Picture",
            "src": "https://i.postimg.cc/Kv36GQk7/3.jpg"
        },
        {
            "alt": "Banner-5 Picture",
            "src": "https://i.postimg.cc/zX4hbc1s/light-yellow-background-mv77cxaxfh2k9cwd.jpg"
        }
    ];

    // Next button's function with useCallback
    const handleNext = useCallback(() => {
        setNext((preValue) => {
            if (preValue == sliderBGs.length - 1) {
                return 0;
            };
            return preValue + 1;
        })
    }, [sliderBGs.length]);

    // Previous button function
    const handlePre = () => {
        if (next == 0) {
            setNext(sliderBGs.length - 1);
        } else {
            setNext(next - 1);
        };
    };

    // useEffect to set auto change background in slider
    useEffect(() => {
        ref.current = setInterval(handleNext, 2000);
        return () => clearInterval(ref.current);
    }, [handleNext]);

    const pauseSlider = () => clearInterval(ref.current);
    const resumeSlider = () => {
        ref.current = setInterval(handleNext, 2000);
    };

    return (
        <section className='relative'
            onMouseEnter={pauseSlider}
            onMouseLeave={resumeSlider}
        >
            {/* Previous Button */}
            <button
                onClick={handlePre}
                className='absolute md:left-4 lg:top-60 md:top-66 sm:left-6 sm:top-88 top-76 left-4 overflow-hidden group p-[10px] flex  justify-center bg-[var(--color-primary-orange)] text-white rounded-full hover:-translate-x-2 transition-all duration-600 z-2'>
                <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-dark-secondary)] transition-all duration-500 group-hover:w-full z-0"></span>
                <IoIosArrowBack className='relative lg:text-3xl md:text-2xl text-xl' />
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className='group-hover:flex absolute md:right-4 lg:top-60 md:top-66 sm:right-96 sm:top-88 top-76 right-4 overflow-hidden group p-[10px] justify-center bg-[var(--color-primary-orange)] text-white rounded-full hover:translate-x-2 transition-all duration-600 z-5'>
                <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-dark-secondary)] transition-all duration-500 group-hover:w-full z-0"></span>
                <IoIosArrowForward className='relative lg:text-3xl md:text-2xl text-xl' />
            </button>

            {/* Slider Image */}
            <img className='w-full sm:h-[526px] h-[600px]' src={sliderBGs[next].src} alt='banner' />
        </section>
    );
};

export default Slider;