import React, { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            {user ? (
                <div>
                    <img src={user.photoURL} alt={user.displayName} className="rounded-full h-24 w-24" />
                    <h2 className="text-xl mt-2">{user.displayName || user.email}</h2>
                    <p>Email: {user.email}</p>
                    {/* Add other profile-related information here */}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
