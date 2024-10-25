import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark, FaMoon, FaSun } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { AuthContext } from '../contects/AuthProvider';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Nav items
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Sell Your Book", path: "/admin/dashboard" },
        { link: "Blog", path: "/blog" },
    ];

    // Handle navigation for Sell Your Book
    const handleSellYourBookClick = () => {
        if (user) {
            navigate('/admin/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className={`${isSticky ? 'sticky top-0 bg-green shadow-md' : 'bg-white text-black dark:bg-gray-800 dark:text-white'}`}>
            <nav className='container mx-auto flex items-center justify-between py-4 px-4'>
                {/* Hamburger menu button for mobile */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black dark:text-white focus:outline-none'>
                        {isMenuOpen ? <FaXmark className='h-5 w-5' /> : <FaBarsStaggered className='h-5 w-5' />}
                    </button>
                </div>

                {/* Logo */}
                <div className='flex items-center'>
                    <Link to="/" className='text-2xl font-bold text-green-700 flex items-center gap-2'>
                        <FaHome className='inline-block' />
                        Bokhuset
                    </Link>
                </div>

                {/* Dark Mode Toggle with Moon/Sun Icon */}
                <button onClick={toggleDarkMode} className="ml-4 text-xl bg-gray-200 dark:bg-gray-700 p-2 rounded">
                    {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
                </button>

                {/* Nav items for larger screens */}
                <ul className='md:flex space-x-12 hidden'>
                    {navItems.map(({ link, path }, index) => (
                        <li key={`${path}-${index}`}>
                            <Link
                                to={link === "Sell Your Book" ? "#" : path}
                                className='block text-base uppercase cursor-pointer hover:text-red-700 dark:hover:text-red-400'
                                onClick={link === "Sell Your Book" ? handleSellYourBookClick : undefined}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                    {/* User's initials in a circle */}
                    {user && (
                        <li className="flex items-center">
                            <Link to="/admin/dashboard/profile" className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-black dark:text-white font-bold">
                                    {user.displayName ? user.displayName[0] : user.email[0]}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Only show hamburger menu for smaller screens */}
                <div className='hidden md:flex space-x-12 items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-red-700' /></button>
                </div>
            </nav>

            {/* Nav items for smaller screens */}
            {isMenuOpen && (
                <div className='md:hidden space-y-4 px-4 mt-4 py-4 bg-gray-700'>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={link === "Sell Your Book" ? "#" : path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-300' onClick={link === "Sell Your Book" ? handleSellYourBookClick : undefined}>
                            {link}
                        </Link>
                    ))}
                    {/* User's initials in a circle for mobile nav */}
                    {user && (
                        <div className="flex items-center justify-center mt-4">
                            <Link to="/admin/dashboard/profile" className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-black dark:text-white font-bold">
                                    {user.displayName ? user.displayName[0] : user.email[0]}
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
