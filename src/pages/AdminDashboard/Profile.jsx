import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import useAuth from '../../hooks/UseAuth';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        bio: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would save to the database
        setIsEditing(false);
    };

    // Get user photo URL
    const getUserPhotoURL = () => {
        if (user && user.photoURL) {
            return user.photoURL;
        }
        return '/default-profile.png';
    };

    return (
        <>
            {/* Helmet for SEO */}
            <Helmet>
                <title>Profile - Shelfy Admin</title>
                <meta name="description" content="Admin profile for Shelfy book library" />
            </Helmet>

            <div className="space-y-6">
                {/* Page header */}
                <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-[var(--color-dark-secondary)] dark:text-white">
                        My Profile
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Manage your profile information
                    </p>
                </div>

                {/* Profile card */}
                <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-[var(--color-dark-secondary)] to-[var(--color-primary-orange)] p-6">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="relative">
                                <img 
                                    src={getUserPhotoURL()} 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full border-4 border-white"
                                />
                            </div>
                            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-white">
                                    {user?.displayName || 'User'}
                                </h2>
                                <p className="text-white text-opacity-80 mt-1">
                                    Administrator
                                </p>
                                <p className="text-white text-opacity-80 mt-1 flex items-center justify-center md:justify-start">
                                    <FaEnvelope className="mr-2" />
                                    {user?.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-orange)] focus:border-[var(--color-primary-orange)] dark:bg-[#2d3748] dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-orange)] focus:border-[var(--color-primary-orange)] dark:bg-[#2d3748] dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-orange)] focus:border-[var(--color-primary-orange)] dark:bg-[#2d3748] dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-orange)] focus:border-[var(--color-primary-orange)] dark:bg-[#2d3748] dark:text-white"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-orange)] focus:border-[var(--color-primary-orange)] dark:bg-[#2d3748] dark:text-white"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[var(--color-primary-orange)] text-white rounded-md hover:bg-[var(--color-dark-secondary)]"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <FaUser className="text-[var(--color-primary-orange)] mt-1 mr-3" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {user?.displayName || 'User'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaEnvelope className="text-[var(--color-primary-orange)] mt-1 mr-3" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {user?.email || 'user@example.com'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaPhone className="text-[var(--color-primary-orange)] mt-1 mr-3" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {profileData.phone || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="text-[var(--color-primary-orange)] mt-1 mr-3" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                                            <p className="text-gray-900 dark:text-white">
                                                {profileData.address || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bio</h3>
                                        <p className="text-gray-900 dark:text-white">
                                            {profileData.bio || 'No bio available'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-[var(--color-primary-orange)] text-white rounded-md hover:bg-[var(--color-dark-secondary)]"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;