import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }

    }

};

export const registerUserWithEmailAndPassword = async( {email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const loginWithEmailAndPassword = async({ email, password }) => {
    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid,
            photoURL,
            displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
};