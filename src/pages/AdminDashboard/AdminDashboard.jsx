import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBook, FaUsers, FaChartBar, FaTachometerAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <>
            {/* Helmet for SEO */}
            <Helmet>
                <title>Admin Dashboard - Shelfy</title>
                <meta name="description" content="Admin dashboard for managing Shelfy book library" />
            </Helmet>

            <div className="space-y-6">
                {/* Welcome section */}
                <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-[var(--color-dark-secondary)] dark:text-white">
                        Welcome to Admin Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Manage your book library, users, and analytics from this centralized dashboard.
                    </p>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <FaBook className="text-blue-600 dark:text-blue-300 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Books</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                <FaUsers className="text-green-600 dark:text-green-300 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                <FaChartBar className="text-yellow-600 dark:text-yellow-300 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Borrowed Books</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                <FaTachometerAlt className="text-purple-600 dark:text-purple-300 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent activity */}
                <div className="bg-white dark:bg-[#1f2937] rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-[var(--color-dark-secondary)] dark:text-white mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-orange)] flex items-center justify-center text-white">
                                        U
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            User Activity
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Description of the activity
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    2 hours ago
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;