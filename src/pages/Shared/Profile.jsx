import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from 'react-router';
import { MdLogout, MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
    const { signOutUser, user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [clickedOpen, setClickedOpen] = useState(false); // track click
    const modalRef = useRef(null);
    const profileRef = useRef(null);

    // Check if user needs email verification
    const needsEmailVerification = user && !user.emailVerified && user.providerData[0].providerId === 'password';

    const handleSignOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOutUser();
                navigate('/login');
                Swal.fire({
                    title: "Logged out!",
                    text: "You are successfully logged out.",
                    icon: "success"
                });
            };
        });
    };

    const handleVerifyEmail = () => {
        navigate('/email-verification');
        setIsOpen(false);
        setClickedOpen(false);
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !profileRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setClickedOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!clickedOpen) {
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!clickedOpen) {
            setIsOpen(false);
        }
    };

    const handleProfileClick = () => {
        setClickedOpen(!clickedOpen);
        setIsOpen(!clickedOpen);
    };

    // Get user display name
    const getUserDisplayName = () => {
        if (user) {
            return user.displayName || user.email || "User";
        }
        return "User";
    };

    // Get user email
    const getUserEmail = () => {
        if (user && user.email) {
            return user.email;
        }
        return "User Email";
    };

    // Get user photo URL
    const getUserPhotoURL = () => {
        if (user && user.photoURL) {
            return user.photoURL;
        }
        return '/default-profile.png';
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Profile Picture */}
            <img
                ref={profileRef}
                src={getUserPhotoURL()}
                alt="User"
                onClick={handleProfileClick}
                className="w-[35px] h-[35px] rounded-full border-2 border-[#e0e0e0] dark:border-[#3f3f3f] cursor-pointer"
            />

            {/* Modal */}
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-10 md:top-13 sm:top-11 right-0 w-54 bg-white dark:bg-[#343a46] shadow-sm rounded-md p-4 z-50"
                >
                    <div className="flex items-center gap-2">
                        <img
                            src={getUserPhotoURL()}
                            alt="Large User"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <h2 className="text-base font-semibold text-[var(--color-dark-primary)] dark:text-white">
                                {getUserDisplayName()}
                            </h2>
                            <h2 className="text-xs text-gray-600 dark:text-gray-300">
                                {getUserEmail()}
                            </h2>
                        </div>
                    </div>
                    
                    {/* Email verification warning */}
                    {needsEmailVerification && (
                        <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs text-yellow-800 dark:text-yellow-200">
                            <div className="flex items-center">
                                <MdEmail className="mr-1" />
                                <span>Email not verified</span>
                            </div>
                            <button 
                                onClick={handleVerifyEmail}
                                className="mt-1 text-blue-600 dark:text-blue-300 hover:underline"
                            >
                                Verify now
                            </button>
                        </div>
                    )}
                    
                    <hr className="text-gray-300 dark:text-gray-600 mt-3 mb-2" />
                    
                    <button
                        onClick={handleSignOut}
                        className="text-sm w-full flex gap-2 items-center text-gray-500 dark:text-gray-300 py-1 pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                        <MdLogout />  Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;