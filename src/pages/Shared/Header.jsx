import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { MdNotStarted } from "react-icons/md";
import { FaHourglassStart } from 'react-icons/fa6';
import { HiMenuAlt3 } from 'react-icons/hi';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube
} from "react-icons/fa";
import {
    IoLocationOutline, IoMailOutline, IoTimeOutline, IoCallOutline
} from "react-icons/io5";
import {
    FiSearch,
    FiShoppingCart,
    FiX,
    FiLogIn,
} from 'react-icons/fi';
import useTheme from '../../hooks/ThemeContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/all-books', label: 'All Books' },
    { to: '/add-books', label: 'Add Books' },
    { to: '/borrowed-books', label: 'Borrowed Books' },
];

const Header = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // useEffect form real current time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };
            setCurrentTime(now.toLocaleString('en-US', options));
        };

        const timer = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(timer);
    }, []);

    return (
        <header className='sticky top-0 z-50 text-[var(--color-light-primary)] bg-white dark:bg-[var(--color-bg)] w-full'>
            {/* TopBar */}
            <div className="hidden md:flex bg-[var(--color-dark-secondary)] dark:bg-[#374151] text-[13px] xl:px-30 py-[6px] justify-center items-center gap-6">
                <p className='flex gap-[2px] items-center'><MdNotStarted size={16} /> Hello! Welcome to our Shelfy library</p>
                <p className='flex gap-[2px] items-center'><FaHourglassStart size={12} /> {currentTime}</p>
                <Link
                    to='/login'
                    className='flex gap-[2px] items-center dark:text-[#61bfdb]'
                >
                    <FiLogIn /> Login
                </Link>
                <Link
                    to='/register'
                    className='flex gap-[2px] items-center dark:text-[#61bfdb]'
                >
                    <RiLoginCircleLine /> Register
                </Link>
            </div>

            {/* Large device Navbar */}
            <div className='op-0 flex justify-between items-center dark:text-[var(--color-light-primary)] text-[var(--color-bg)] sm:py-4 py-3 px-4 md:px-10 lg:px-4 xl:px-36 '>
                {/* Logo */}
                <Link to="/" className="flex items-center text-xl font-bold">
                    <img src="/logo.png" alt="Shelfy" className="sm:w-12 sm:h-12 w-8 h-8 sm:mr-0 mr-1" />
                    <h1 className="sm:text-3xl text-2xl dark:text-[var(--color-light-secondary)] text-[var(--color-dark-secondary)]">
                        Shel<span className="text-[var(--color-primary-orange)] font-bold">fy</span>
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="text-xs hidden md:flex items-center xl:gap-4 lg:gap-3 gap-4 font-medium xl:ml-8 lg:ml-6 md:ml-8 ml-12">
                    {navLinks.map(({ to, label }) => (
                        <li key={to} className='flex items-center gap-1 cursor-pointer select-none'>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center hover:text-[var(--color-primary-orange)] hover:dark:text-orange-300 ${isActive ? 'text-[var(--color-primary-orange)] dark:text-orange-300 font-bold' : ''}`
                                }
                            >
                                {label}
                                {location.pathname === to ? (
                                    <TiArrowSortedDown className="ml-[2px] text-sm text-[var(--color-primary-orange)] dark:text-orange-300" />
                                ) : (
                                    <TiArrowSortedUp className="ml-[2px] text-sm" />
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Search + Filters */}
                <div className="text-xs flex items-center gap-1 flex-1 justify-end">
                    <div className="hidden lg:flex text-[var(--color-dark-primary)] dark:text-[var(--color-light-primary)] border-2 border-gray-200 dark:border-gray-600 rounded-full overflow-hidden xl:mr-2 mr-1">
                        <select className="px-4 py-[11px] bg-white dark:bg-[#333a45] outline-none">
                            <option>Category</option>
                            <option>Science</option>
                            <option>Fiction</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Author"
                            className="px-3 py-[11px] outline-none w-40 bg-white dark:bg-[#333a45] "
                        />
                        <button className="px-3 py-[11px] transition rounded-r-full bg-white dark:bg-[#333a45] ">
                            <FiSearch size={14} />
                        </button>
                    </div>

                    {/* Theme */}
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

                        {/* sun icon */}
                        <IoIosSunny className="swap-off fill-orange-400 text-[32px] sm:text-[35px] p-[5px] sm:p-[7px] border-2 border-gray-200 dark:border-gray-600 rounded-full transition duration-500" />

                        {/* moon icon */}
                        <IoIosMoon className="swap-on fill-blue-200 text-[32px] sm:text-[35px] p-[5px] sm:p-[7px] border-2 border-gray-200 dark:border-gray-600 rounded-full transition duration-500" />
                    </label>

                    {/* Shopping cart */}
                    <button className="text-xs p-[8px] sm:p-[10px] border-2 border-gray-200 dark:border-gray-600 dark:text-white rounded-full hover:bg-[var(--color-primary-orange)] font-bold hover:text-white transition duration-500">
                        <FiShoppingCart />
                    </button>

                    {/* small or medium devices Navbar */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-xl p-[7px] sm:p-[9px] dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-full  hover:bg-[var(--color-primary-orange)]  hover:text-white font-bold transition duration-500"
                    >
                        <HiMenuAlt3 size={14} />
                    </button>
                </div>
            </div>

            {/* Side bar  */}
            {isSidebarOpen &&
                <div
                    className={`
                        fixed inset-0 z-50
                        ${isSidebarOpen ? 'pointer-events-auto bg-black/60 backdrop-blur-xs' : 'pointer-events-none'}
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div
                        className={`
                            absolute top-0 right-0 sm:w-72 w-[280px] h-screen bg-[var(--color-light-accent)] p-3
                            overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center pt-[10px] px-[6px]'>
                            {/* Logo */}
                            <Link to="/" className="flex items-center text-xl gap-1 font-bold text-[var(--color-dark-secondary)]">
                                <img src="/logo.png" alt="Shelfy" className="w-8 h-8" />
                                <h1 className="text-xl">
                                    Shel<span className="text-[var(--color-primary-orange)]">fy</span>
                                </h1>
                            </Link>

                            {/* Close icon */}
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 border border-gray-300 rounded-full text-white bg-[var(--color-dark-secondary)] hover:bg-[var(--color-primary-orange)] transition duration-500"
                            >
                                <FiX size={14} />
                            </button>
                        </div>

                        <div className="text-xs text-black flex border-2 border-blue-100 rounded-full overflow-hidden bg-slate-100 mt-3">
                            <select className="px-4 py-2 bg-slate-100 outline-none">
                                <option>Category</option>
                                <option>Science</option>
                                <option>Fiction</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Author"
                                className="px-3 py-2 outline-none w-full bg-slate-100"
                            />
                            <button className="text-black px-3 py-[11px] transition rounded-r-full">
                                <FiSearch size={14} />
                            </button>
                        </div>

                        {/* Sidebar links */}
                        <ul className="md:hidden flex flex-col gap-1 font-semibold pl-[10px] pr-[18px] pt-4 text-xs text-[#012E4A]">
                            {navLinks.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between gap-1 cursor-pointer select-none hover:text-[var(--color-primary-orange)] ${isActive ? 'text-[var(--color-primary-orange)] font-bold' : ''}`
                                    }
                                >
                                    <p>{label}</p>
                                    <p className='text-xl'>
                                        {location.pathname === to ? (
                                            '-'
                                        ) : (
                                            '+'
                                        )}
                                    </p>
                                </NavLink>
                            ))}
                        </ul>

                        {/* Contact Info */}
                        <div className='text-gray-500 px-[10px] flex flex-col gap-2 mt-4'>
                            <p className='hidden md:block text-xs text-gray-600'>
                                Read books anytime, anywhere, and discover stories that matter. We provide quality books and unbeatable value.
                            </p>
                            <h1 className='text-base text-[#012E4A] font-bold mb-1'>Contact Info</h1>
                            <div className='space-y-[6px] text-xs text-gray-500'>
                                <h1 className=' flex items-center'>
                                    <IoLocationOutline className='mr-1'/> Warless Bazar, Chandpur, Bangladesh
                                </h1>
                                <h1 className='flex items-center'>
                                    <IoMailOutline className='mr-1'/> sifayed99@gmail.com
                                </h1>
                                <h1 className=' flex items-center'>
                                    <IoTimeOutline className='mr-1' /> Mod-friday, 09am -05pm
                                </h1>
                                <h1 className=' flex items-center'>
                                    <IoCallOutline className='mr-1'/> 8801 9978 5648
                                </h1>
                            </div>

                            {/* Login & Register buttons */}
                            <div className='flex flex-col gap-1 mt-2 mb-1'>
                                <Link to='/login'>
                                    <button className='relative overflow-hidden group text-xs font-semibold px-6 py-[10px] w-full flex justify-center bg-[var(--color-dark-secondary)] text-white rounded-full'>
                                        <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-primary-orange)] transition-all duration-500 group-hover:w-full z-0"></span>
                                        <span className='relative z-10 flex gap-1 items-center'>
                                            Login <FiLogIn />
                                        </span>
                                    </button>
                                </Link>
                                <Link to='/login'>
                                    <button className='relative overflow-hidden group text-xs font-semibold px-6 py-[10px] w-full flex justify-center bg-[var(--color-dark-secondary)] text-white rounded-full'>
                                        <span className="absolute left-0 top-0 h-full w-0 bg-[var(--color-primary-orange)] transition-all duration-500 group-hover:w-full z-0"></span>
                                        <span className='relative z-10 flex gap-1 items-center'>
                                            Register <RiLoginCircleLine />
                                        </span>
                                    </button>
                                </Link>
                            </div>

                            <div className="flex text-xs">
                                {[FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                                    <div
                                        key={index}
                                        className="mr-1 p-2 hover:text-white  hover:bg-[var(--color-primary-orange)] rounded-full transition duration-300"
                                    >
                                        <Icon />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </header >
    );
};

export default Header;