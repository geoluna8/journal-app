// para tareas asincronas

import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        console.log({ result });
        
        if( !result.ok ) return dispatch( logout(result.errorMessage) );
        
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

       const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword( { email, password, displayName } );
       
       if ( !ok ) return dispatch( logout({ errorMessage }));

       dispatch( login({ email, displayName, photoURL, uid }));
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailAndPassword( {email, password} );
        console.log( result );

        if( !result.ok ) return dispatch( logout(result) );
        dispatch( login( result ) );
    }
};

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
};