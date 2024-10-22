import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6"; // Behåll FaBarsStaggered och FaXmark från fa6
import { FaHome } from "react-icons/fa"; // Byt ut husikonen till FaHome från fa
import { AuthContext } from '../contects/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    const {user} = useContext(AuthContext);
    console.log(user)

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // navItems här 
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" }, // Ändrad väg
        { link: "Sell Your Book", path: "/admin/dashboard" },
        { link: "Blog", path: "/blog" },
    ];
    

    return (
        <header className={`${isSticky ? 'sticky top-0 bg-white shadow-md' : ''}`}>
            <nav className='container mx-auto flex items-center justify-between py-4 px-4'>
                
                {/** Hamburgermeny-knappen för mobil på vänster sida */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {isMenuOpen ? <FaXmark className='h-5 w-5' /> : <FaBarsStaggered className='h-5 w-5' />}
                    </button>
                </div>

                {/** Logo */}
                <div className='flex items-center'>
                    <Link to="/" className='text-2xl font-bold text-green-700 flex items-center gap-2'>
                        <FaHome className='inline-block' /> {/* Husikonen */}
                        Books
                    </Link>
                </div>

                {/** Nav-objekt för större enheter */}
                <ul className='md:flex space-x-12 hidden'>
    {navItems.map(({ link, path }, index) => (
        <li key={`${path}-${index}`}> {/* Lägg till index för att göra nyckeln unik */}
            <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                {link}
            </Link>
           
        </li>
    ))}
       {
        user ? user.email : "" // Visa användarens riktiga e-postadress
    }
    
</ul>


                {/** Meny-knapp för stora enheter */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>
                </div>
            </nav>

            {/** Nav-objekt för små enheter */}
            {isMenuOpen && (
                <div className='md:hidden space-y-4 px-4 mt-4 py-4 bg-blue-700'>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-300'>
                            {link}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    )
}

export default Navbar;
