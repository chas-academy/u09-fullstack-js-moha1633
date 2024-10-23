import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import googleLogo from "../assets/banner-books/googleLogo.png"; // Ensure path is correct

const Signup = () => {
    const { createUser, loginWithGoogle } = useContext(AuthContext); // Corrected function name
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const location = useLocation();
    const navigate = useNavigate(); 
    const from = location.state?.from?.pathname || "/"; 

    const handleSignup = async (event) => {
        event.preventDefault(); 
        const form = event.target;
        const email = form.email.value; 
        const password = form.password.value; 

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true); 

        try {
            await createUser(email, password);
            setLoading(false); 
            alert("Sign up successfully!"); 
            navigate(from, { replace: true }); 
        } catch (error) {
            setError(error.message); 
            setLoading(false); 
        }
    };

    const handleRegister = async () => {
        setLoading(true); // Show loading state
        try {
            const result = await loginWithGoogle(); // Use corrected function name
            const user = result.user;
            alert("Sign up successfully!");
            navigate(from, {replace: true});
        } catch (error) {
            setError(error.message); 
            setLoading(false); 
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Sign up</h1>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSignup} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                                        placeholder="E-postadress"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                                        placeholder="Lösenord"
                                        required
                                    />
                                </div>
                                <p>
                                    If you have an account, please{' '}
                                    <Link to="/login" className="text-green-600 underline">
                                        Log in
                                    </Link>{' '}
                                    her.
                                </p>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white rounded-md px-6 py-2"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing up...' : 'Sign Up'}
                                    </button>
                                </div>

                                <div className='flex w-full items-center flex-col mt-5 gap-3'>
                                    <button 
                                        type="button" 
                                        onClick={handleRegister} 
                                        className='flex items-center bg-white border border-gray-300 rounded-md px-4 py-2'
                                    >
                                        <img src={googleLogo} alt="Google Logo" className='w-8 h-8 inline-block mr-2' />
                                        <span>Sign Up with Google</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;