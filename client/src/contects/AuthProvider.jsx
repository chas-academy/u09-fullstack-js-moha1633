import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config'; // Ensure this path is correct
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    // Create User
    const createUser = async (email, password) => {
        setLoading(true);
        setError(null); // Reset error before making a request
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user; // Return user on success
        } catch (error) {
            console.error("Error creating user:", error);
            setError(error.message); // Set error message
            throw error; // Throw error to be caught in the component
        } finally {
            setLoading(false);
        }
    };

    // Login with Google
    const loginWithGoogle = async () => {
        setLoading(true);
        setError(null); // Reset error before making a request
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            return user; // Return user on success
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError(error.message); // Set error message
            throw error; // Throw error to be caught in the component
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (email, password) => {
        setLoading(true);
        setError(null); // Reset error before making a request
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user; // Return user on success
        } catch (error) {
            console.error("Error logging in:", error);
            setError(error.message); // Set error message
            throw error; // Throw error to be caught in the component
        } finally {
            setLoading(false);
        }
    };

    // Auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Exposing auth states and methods
    const authInfo = {
        user,
        loading,
        error, // Expose error state
        createUser,
        loginWithGoogle,
        login,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
