import { createContext, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {  // Fix: use lowercase 'children'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);  // Save the user data
        setLoading(false);             // Stop loading after creating user
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setLoading(false);             // Stop loading even if there's an error
      });
  };

  // You can add more functions like login, logout, etc.

  const authInfo = {
    user,         // Provide the user state to all consumers
    loading,      // Provide loading state for handling loading UI if needed
    createUser,   // Provide the createUser function to be used in components
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}  {/* Fix: use lowercase 'children' */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
