import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { AuthContext } from '../contects/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // navItems
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
        <header className={`${isSticky ? 'sticky top-0 bg-green shadow-md' : ''}`}>
            <nav className='container mx-auto flex items-center justify-between py-4 px-4'>
                {/* Hamburger menu button for mobile */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {isMenuOpen ? <FaXmark className='h-5 w-5' /> : <FaBarsStaggered className='h-5 w-5' />}
                    </button>
                </div>

                {/* Logo */}
                <div className='flex items-center'>
                    <Link to="/" className='text-2xl font-bold text-green-700 flex items-center gap-2'>
                        <FaHome className='inline-block' />
                        Books
                    </Link>
                </div>

                {/* Nav items for larger screens */}
                <ul className='md:flex space-x-12 hidden'>
                    {navItems.map(({ link, path }, index) => (
                        <li key={`${path}-${index}`}>
                            <Link
                                to={link === "Sell Your Book" ? "#" : path}
                                className='block text-base text-black uppercase cursor-pointer hover:text-red-700'
                                onClick={link === "Sell Your Book" ? handleSellYourBookClick : undefined}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                    {/* Show user's name or email in a rounded container */}
                    {user && (
                        <li className="flex items-center">
                            <span className="bg-gray-200 text-black rounded-full px-3 py-1 font-medium">
                                Welcome, {user.email || user.displayName}
                            </span>
                        </li>
                    )}
                </ul>

                {/* Menu button for larger screens */}
                <div className='space-x-12 hidden lg:flex items-center'>
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
                    {/* Display user's name/email in mobile nav */}
                    {user && (
                        <span className="block text-white text-center font-medium">
                            Welcome, {user.email || user.displayName}
                        </span>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
