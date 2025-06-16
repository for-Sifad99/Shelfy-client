import React from 'react';
import { Link } from 'react-router';
import { FaCertificate } from "react-icons/fa";

const books = [
    {
        "bookImg": "https://i.postimg.cc/8CDr8DQV/history-1.jpg",
        "category": "History"
    },
    {
        "bookImg": "https://i.postimg.cc/1R0gyhRT/thriller.jpg",
        "category": "Thriller"
    },
    {
        "bookImg": "https://i.postimg.cc/YqN1BdXc/novel.jpg",
        "category": "Novel"
    },
    {
        "bookImg": "https://i.postimg.cc/GhfKs3RN/drama-4.jpg",
        "category": "Drama"
    }
]

const Categories = () => {
    return (
        <section className='bg-[#d0e1e7] dark:bg-[var(--color-bg)] xl:px-40 md:px-4 sm:px-10 sm:py-20 py-10 my-10'>
            <div className='flex flex-col sm:flex-row items-center justify-between sm:mb-6 mb-4 xl:px-9 lg:px-6 md:px-12 gap-1'>
                <h1 className='text-2xl md:text-3xl font-semibold text-[var(--color-dark-secondary)] dark:text-[var(--color-light-secondary)]'>Book Categories</h1>
                <Link to='/all-books'>
                    <button className='relative overflow-hidden group text-xs font-semibold sm:px-6 sm:py-[10px] px-4 py-2 border border-[var(--color-dark-secondary)] dark:border-[var(--color-light-secondary)] text-[var(--color-dark-secondary)] dark:text-[var(--color-light-secondary)] hover:text-white  tarnsition-all duration-500 rounded-full'>
                        <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-dark-secondary)] dark:bg-[var(--color-light-secondary)] transition-all duration-700 group-hover:w-full z-0"></span>
                        <span className='relative z-10'>
                            Explore Books
                        </span>
                    </button>
                </Link>
            </div>
            <div className="flex flex-wrap mx-auto justify-center items-center gap-4">
                {books.map((book, index) => (
                    <Link to={`/category-books/${book.category}`} key={index} className="rounded-xl transition-all duration-300 hover:-translate-y-2">
                        <div className='relative  bg-[#f5f5f5] dark:bg-[#374151] p-6 flex flex-col justify-center items-center rounded-xl'>
                            <div className='absolute top-20 z-30 text-[var(--color-dark-secondary)] text-lg font-semibold animate-[spin_2s_linear_infinite]'>
                                <FaCertificate size={90} />
                                <span className='text-white absolute top-8 left-4'> {book.category}</span>
                            </div>
                            <img
                                src={book.bookImg}
                                alt={book.bookTitle}
                                className="w-[180px] h-[200px] object-cover rounded"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;