import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

const Signup = () => {
    // Hämta createUser-funktionen från AuthContext
    const { createUser } = useContext(AuthContext); 
    
    // Hantera felmeddelanden och laddningsstatus
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    const location = useLocation(); // Används för att ta reda på vart användaren ska omdirigeras efter inloggning
    const navigate = useNavigate(); // Används för att navigera till olika sidor
    
    // Bestäm var användaren ska omdirigeras efter att ha loggat in
    const from = location.state?.from?.pathname || "/"; 

    // Funktion som hanterar när användaren skickar in formuläret
    const handleSignup = async (event) => {
        event.preventDefault(); // Förhindra att sidan laddas om
        const form = event.target;
        const email = form.email.value; // Hämta e-post från formuläret
        const password = form.password.value; // Hämta lösenord från formuläret

        // Kontrollera att lösenordet är minst 6 tecken långt
        if (password.length < 6) {
            setError("Sign up successfully!");
            return;
        }

        setLoading(true); // Starta laddningsindikator

        try {
            // Anropa createUser för att registrera en ny användare
            const userCredential = await createUser(email, password);
            setLoading(false); // Stoppa laddningsindikatorn
            alert("Sign up successfully!"); // Visa ett meddelande om framgång
            navigate(from, { replace: true }); // Omdirigera användaren till rätt sida
        } catch (error) {
            setError(error.message); // Visa felmeddelande om något går fel
            setLoading(false); // Stoppa laddningsindikatorn vid fel
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Sign up</h1>
                        </div>
                        {/* Om det finns ett felmeddelande, visa det */}
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSignup} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    {/* Fält för e-post */}
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
                                    {/* Fält för lösenord */}
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
                                If you have an account, please?{' '}
                                    <Link to="/login" className="text-green-600 underline">
                                        Log in
                                    </Link>{' '}
                                    här.
                                </p>
                                <div className="relative">
                                    {/* Knapp för att skicka formuläret */}
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white rounded-md px-6 py-2"
                                        disabled={loading} // Inaktivera knappen under laddning
                                    >
                                        {loading ? 'Signing up...' : 'Signing up'}
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
