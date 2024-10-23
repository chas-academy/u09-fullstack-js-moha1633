import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config'; // Ensure this path is correct
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User object
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [userRole, setUserRole] = useState('viewer'); // Default role

    // Create User
    const createUser = async (email, password, role = 'viewer') => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setUserRole(role); // Assign role to the user
            return userCredential.user;
        } catch (error) {
            console.error("Error creating user:", error);
            setError(error.message);
            throw error; // Rethrow to handle in the component
        } finally {
            setLoading(false);
        }
    };

    // Login with Google
    const loginWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            // Ideally, set userRole here based on your DB or logic
            return user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Login with email and password
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            // Ideally, set userRole here based on your DB or logic
            return userCredential.user;
        } catch (error) {
            console.error("Error logging in:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setUserRole('viewer'); // Reset role on logout
        } catch (error) {
            console.error("Error logging out:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Auth state listener to keep track of user status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            // If you have a method to fetch roles, do it here
            // Example: fetchUserRole(currentUser.uid).then(role => setUserRole(role));
        });

        return () => {
            unsubscribe(); // Clean up the listener on component unmount
        };
    }, []);

    // Exposing auth states and methods
    const authInfo = {
        user,
        loading,
        error,
        userRole, // Exposing user role
        createUser,
        loginWithGoogle,
        login,
        logOut,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };

