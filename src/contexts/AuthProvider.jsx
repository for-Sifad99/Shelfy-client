import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, updateProfile, signOut, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper functions for loading state
    const startLoading = useCallback(() => {
        setLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setLoading(false);
    }, []);

    // Memoize Google provider to prevent recreation on each render
    const googleProvider = useMemo(() => new GoogleAuthProvider(), []);

    //? Create User:
    const createUser = useCallback(async (email, password) => {
        startLoading();
        try {
            // Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    //? Create User with Google:
    const createGoogleUser = useCallback(async () => {
        startLoading();
        try {
            // Sign in with Google
            const userCredential = await signInWithPopup(auth, googleProvider);
            return userCredential;
        } finally {
            stopLoading();
        }
    }, [googleProvider, startLoading, stopLoading]);

    //? SignIn User:
    const signInUser = useCallback(async (email, password) => {
        startLoading();
        try {
            // Sign in user with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    //? Reset Password:
    const forgotPassword = useCallback((email) => {
        startLoading();
        return sendPasswordResetEmail(auth, email);
    }, [startLoading]);

    //? Update User Profile:
    const profileUpdate = useCallback((currentUser, updatedObj) => {
        startLoading();
        return updateProfile(currentUser, updatedObj);
    }, [startLoading]);

    //? Send Email Verification:
    const sendVerificationEmail = useCallback(async (user) => {
        startLoading();
        try {
            // Check if we're being called too frequently
            const lastSent = localStorage.getItem('lastVerificationEmailSent');
            const now = Date.now();
            
            // If less than 1 minute has passed, reject the request
            if (lastSent && (now - parseInt(lastSent)) < 60000) {
                throw new Error('Please wait before requesting another verification email');
            }
            
            const result = await sendEmailVerification(user);
            
            // Store the time we sent the email with safe localStorage operation
            try {
                localStorage.setItem('lastVerificationEmailSent', now.toString());
            } catch (error) {
                console.warn('Failed to set item in localStorage for key: lastVerificationEmailSent', error);
            }
            
            return result;
        } catch (error) {
            // Handle quota exceeded error specifically
            // Check if it's a "too many requests" error by looking at error properties
            if (error && typeof error === 'object' && 
                (error.code === 'auth/too-many-requests' ||
                 (error.message && error.message.includes('too many requests')) ||
                 (error.response && error.response.status === 429))) {
                throw new Error('Too many requests. Please wait a while before requesting another verification email.');
            }
            throw error;
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    //? SignOut User:
    const signOutUser = useCallback(() => {
        startLoading();
        return signOut(auth);
    }, [startLoading]);

    //? Observer:
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            stopLoading();
        });

        return () => {
            unSubscribe();
        };
    }, [stopLoading]);

    // Memoize authInfo to prevent unnecessary re-renders
    const authInfo = useMemo(() => ({
        loading,
        user,
        setUser,
        createUser,
        createGoogleUser,
        signInUser,
        forgotPassword,
        profileUpdate,
        sendVerificationEmail,
        signOutUser
    }), [loading, user, createUser, createGoogleUser, signInUser, forgotPassword, profileUpdate, sendVerificationEmail, signOutUser]);

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>  
};

export default AuthProvider;