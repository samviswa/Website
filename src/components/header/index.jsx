import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import '../header/header.css';

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { userLoggedIn, userEmail } = useAuth();

    const menuRef = useRef();
    const imageRef = useRef();

    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imageRef.current) {
            setOpen(false);
        }
    });

    const isAdmin = userEmail === 'l0tteryapp2024@gmail.com';

    return (
        <nav className='nav w-full z-20 fixed top-0 left-0 h-14 border-b flex justify-between items-center bg-blue-200'>
            <div className="flex items-center">
                <Link className='text-sm text-blue-600 underline ml-6' to={'/'}>Home</Link>
                {isAdmin && <Link className='text-sm text-blue-600 underline ml-6' to={'/admin'}>Admin</Link>}
            </div>
            {userLoggedIn ? (
                <div>
                    <img
                        src={"https://i.postimg.cc/mg3x3f54/avatar.png"}
                        ref={imageRef}
                        onClick={() => setOpen(!open)}
                        alt=""
                        className='havatar h-10 w-10 object-cover border-double hover:scale-105 border-2 border-blue-700 rounded-full mr-6 cursor-pointer' />
                    {open && (
                        <div
                            ref={menuRef}
                            className='menuCon bg-white p-4 w-52 shadow-lg absolute right-1 top-14 flex flex-col items-start'>
                            <ul>
                                <li className='text-lg p-2 rounded hover:bg-blue-200 cursor-pointer'>
                                    <Link to={'/profile'}>Profile</Link>
                                </li>
                                <li className='text-lg p-2 rounded hover:bg-blue-200 cursor-pointer'>
                                    <Link to={'/settings'}>Settings</Link>
                                </li>
                                <li className='text-lg p-2 rounded hover:bg-blue-200 cursor-pointer'>
                                    <Link to={'/mytickets'}>My Tickets</Link>
                                </li>
                                <li className='text-lg p-2 rounded hover:bg-blue-200 cursor-pointer'>
                                    <Link to={'/faq'}>FAQs</Link>
                                </li>
                                <li className='text-lg p-2 rounded hover:bg-blue-200 cursor-pointer'>
                                    <button
                                        onClick={() => {
                                            doSignOut().then(() => {
                                                navigate('/login');
                                            });
                                        }}
                                        className="focus:outline-none">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex">
                    <Link className='text-sm text-blue-600 underline mr-6' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline mr-6' to={'/register'}>Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Header;