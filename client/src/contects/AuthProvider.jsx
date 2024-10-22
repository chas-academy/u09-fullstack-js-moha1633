import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config'; // Ensure this path is correct
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                return userCredential.user; // Return user on success
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                throw error; // Throw error to be caught in Signup component
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                return user; // Return user on success
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                throw error; // Throw error to be caught in Signup component
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginWithGoogle,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
