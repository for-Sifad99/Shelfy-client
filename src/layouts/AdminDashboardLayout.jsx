import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FaBars, FaTimes, FaTachometerAlt, FaBook, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/UseAuth';

const AdminDashboardLayout = () => {
    const { user, signOutUser } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                // Sign-out successful
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    };

    const navItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin-dashboard' },
        { name: 'Manage Books', icon: <FaBook />, path: '/admin-dashboard/manage-books' },
        { name: 'Manage Users', icon: <FaUsers />, path: '/admin-dashboard/manage-users' },
        { name: 'Reports', icon: <FaChartBar />, path: '/admin-dashboard/reports' },
        { name: 'Settings', icon: <FaCog />, path: '/admin-dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-bg)]">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-dark-secondary)] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-primary-orange)]">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                        <span className="text-xl font-bold">Shelfy Admin</span>
                    </div>
                    <button 
                        className="lg:hidden text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>
                
                <nav className="mt-6">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className="mb-1">
                                <Link 
                                    to={item.path}
                                    className="flex items-center px-4 py-3 text-sm font-medium hover:bg-[var(--color-primary-orange)] transition-colors duration-200"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                
                <div className="absolute bottom-0 w-full p-4 border-t border-[var(--color-primary-orange)]">
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors duration-200"
                    >
                        <FaSignOutAlt className="mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white dark:bg-[var(--color-dark-secondary)] shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button 
                            className="lg:hidden text-[var(--color-dark-secondary)] dark:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FaBars />
                        </button>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="User" 
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-orange)] flex items-center justify-center text-white">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <span className="ml-2 text-sm font-medium text-[var(--color-dark-secondary)] dark:text-white">
                                    {user?.displayName || user?.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-[#1a1d24]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;