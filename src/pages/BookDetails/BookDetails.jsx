import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import axios from "axios";
import leftBook from '../../assets/commonBanners/leftBook.png';
import rightBook from '../../assets/commonBanners/rightBook.png';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineProductionQuantityLimits, MdOutlineCategory } from "react-icons/md";
import { FaGripLinesVertical } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from "react-router";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const {
        bookImg,
        bookTitle,
        authorName,
        rating,
        shortDescription,
        bookContent,
        category,
        quantity,
    } = book;

    // Fetch book info by Id
    useEffect(() => {
        axios.get(`http://localhost:3000/allBooks/${id}`)
            .then(res => {
                setBook(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch book info", err);
            });
    }, [id]);

    return <>
        {/* Helmet */}
        <Helmet>
            <title>Book Peek - Shelfy</title>
            <meta name="description" content="Check out the juicy details before you borrow or bounce." />
        </Helmet>


        {/* Page Banner */}
        <div className="flex justify-between items-center bg-[#e6eff2] dark:bg-[#19343d] sm:py-6 py-12">
            {/* Left Image */}
            <img
                src={leftBook}
                alt="Banner Book1 image"
                className="hidden sm:block w-48 md:w-54 lg:w-64 pt-10"
            />

            {/* Title and Breadcrumb */}
            <div className="flex flex-col items-center justify-center text-center mx-auto sm:py-0 py-3">
                <h1 className="text-[#012e4a] dark:text-[var(--color-light-primary)] font-semibold text-2xl md:text-3xl lg:text-4xl">
                    Borrow Book 
                </h1>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm font-normal text-gray-600 dark:text-slate-400 sm:mt-1">
                    <Link to="/">Home</Link>
                    <IoIosArrowForward />
                    <span className='text-orange-500 dark:text-orange-300'>Book Details</span>
                </div>
            </div>

            {/* Right Image */}
            <img
                src={rightBook}
                alt="Banner Book2 image"
                className="hidden sm:block w-28 md:w-34 lg:w-40 pt-10"
            />
        </div>

    {/* Content */ }
    <div className="flex flex-col md:flex-row gap-6 py-10 xl:px-0 lg:px-6 md:px-8 max-w-5xl mx-auto">
        {/* Book Image */}
        <div className='flex-shrink-0 bg-[#f5f5f5] dark:bg-[#374151] md:mx-0 sm:mx-20 mx-4 py-12 px-24 flex justify-center items-center rounded-xl'>
            <img
                src={bookImg}
                alt={bookTitle}
                className="w-[180px] object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
        </div>

        {/* Book Info */}
        <div className="flex-1 md:mt-10 mt-4 space-y-2 md:mx-0 sm:mx-20 mx-4">
            <div className='flex items-center sm:gap-10 gap-2'>
                <h2 className="lg:text-3xl md:text-2xl sm:text-3xl text-xl font-bold text-[var(--color-dark-primary)] dark:text-[var(--color-light-primary)]">{bookTitle}</h2>

                <p className="lg:text-base md:text-sm sm:text-base text-xs text-green-600 font-semibold">{quantity > 0 ? 'Available in stock' : 'Out of stock'}</p>
            </div>

            <p className="text-sm font-bold dark:text-white -mt-2">By <span className="font-normal text-blue-600 dark:text-blue-400 underline">{authorName}</span></p>


            {/* Ratings */}
            <div className="text-yellow-500 inline-block">
                <Rating
                    style={{ maxWidth: 80 }}
                    value={rating}
                    readOnly
                    halfFillMode="svg"
                    itemStyles={{
                        itemShapes: Star,
                        activeFillColor: '#ffa900',
                        inactiveFillColor: '#e5e7eb',
                    }}
                />
            </div>

            <p className="sm:text-base text-xs dark:text-gray-300 text-gray-700">{shortDescription}</p>

            <div className='flex sm:flex-row flex-col sm:gap-4 gap-1 sm:items-center items-start dark:text-gray-200'>
                <p className="flex items-center gap-1 sm:text-base text-sm font-bold"><MdOutlineProductionQuantityLimits />Quantity :<span className=" text-orange-500">{quantity}</span></p>

                <p className='m:block hidden'><FaGripLinesVertical /></p>

                <p className="flex items-center gap-1 sm:text-base text-sm font-bold"><MdOutlineCategory />Category :<span className=" text-orange-500">{category}</span></p>
            </div>

            {/* Buttons */}
            <button
                className='relative overflow-hidden group sm:text-sm text-xs font-semibold px-6 py-[8px] w-[160px] flex justify-center text-[var(--color-dark-secondary)] hover:text-white  bg-[#eeebfd] rounded-full transition-all duration-300 mt-2'>
                <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-primary-orange)] transition-all duration-500 group-hover:w-full z-0"></span>
                <span className='relative z-10 '>
                    Borrow
                </span>
            </button>

            {/* Extra Info */}
            <div className="flex flex-col gap-1 mt-4 border-t border-gray-400 dark:border-slate-500 pt-2 lg:text-sm md:text-xs sm:text-sm text-xs 
                ">
                <h1 className='font-bold md:text-2xl sm:text-3xl text-xl text-gray-700 dark:text-white'>Book Content :</h1>
                <p className='font-normal text-gray-700 dark:text-gray-400'>{bookContent}</p>
            </div>
        </div>
    </div>
    </>
};

export default BookDetails;
