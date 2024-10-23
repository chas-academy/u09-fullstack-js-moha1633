import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import googleLogo from "../assets/banner-books/googleLogo.png"; // Ensure path is correct

const Login = () => {
    const { login, loginWithGoogle } = useContext(AuthContext); // Corrected to match the AuthProvider
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const location = useLocation();
    const navigate = useNavigate(); 
    const from = location.state?.from?.pathname || "/"; 

    const handleLogin = async (event) => {
        event.preventDefault(); 
        const form = event.target;
        const email = form.email.value; 
        const password = form.password.value; 

        setLoading(true); // Set loading state
        setError(null); // Reset error state

        try {
            await login(email, password); // Call the login function
            alert("Login successfully!!");
            navigate(from, { replace: true });
        } catch (error) {
            setLoading(false); // Reset loading state on error
            if (error.code === 'auth/wrong-password') {
                setError("Incorrect password. Please try again."); // Specific error message for wrong password
            } else if (error.code === 'auth/user-not-found') {
                setError("No user found with this email. Please sign up."); // Specific error message for user not found
            } else {
                setError("in Corrected password or username . Please try again later .you are gaabo u need to eat fruit every day"); // General error message
            }
        }
    };

    const handleRegister = async () => {
        setLoading(true); // Show loading state
        try {
            await loginWithGoogle(); // Use corrected function name
            alert("Login successful!");
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1> 
                        </div>
                        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                        <form onSubmit={handleLogin} className="divide-y divide-gray-200">
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
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <p>
                                    If you don't have an account, please{' '}
                                    <Link to="/sign-up" className="text-green-600 underline">
                                        Sign up
                                    </Link>{' '}
                                    here.
                                </p>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white rounded-md px-6 py-2"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Log In'}
                                    </button>
                                </div>

                                <div className='flex w-full items-center flex-col mt-5 gap-3'>
                                    <button 
                                        type="button" 
                                        onClick={handleRegister} 
                                        className='flex items-center bg-white border border-gray-300 rounded-md px-4 py-2'
                                    >
                                        <img src={googleLogo} alt="Google Logo" className='w-8 h-8 inline-block mr-2' />
                                        <span>Login with Google</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
