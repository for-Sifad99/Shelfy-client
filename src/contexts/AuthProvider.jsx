import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';


const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    //? Create User:
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //? Create User with Goggle:
    const googleProvider = new GoogleAuthProvider();

    const createGoogleUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    //? SignOut User:
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    //? Observer:
    useEffect(() => {
        const  unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe(); 
        };
    }, []);

    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        createGoogleUser,
        signOutUser
    };

    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;