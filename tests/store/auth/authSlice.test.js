import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
  
    test('debe de regresar el estado inicial y llamarse "auth" ', () => {
        
        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer( initialState, {});
        // console.log(state);

        expect( state ).toEqual( initialState );

    });

    test('debe de realizar la autenticacion', () => {
      
        const state = authSlice.reducer( initialState, login( demoUser ) );
        //console.log( login(demoUser) )
        /*  {
                type: 'auth/login',
                payload: {
                uid: '123ABC',
                email: 'demo@google.com',
                displayName: 'Demo User',
                photoURL: 'https://demo.jpg'
                }
            } */

        expect( state ).toEqual({
            status: 'authenticated', // 'checking', 'authenticated', 'not-authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });

    });

    test('debe de realizar logout sin argumentos', () => {
      
        const state = authSlice.reducer( authenticatedState, logout());
        // console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });
    
    test('debe de realizar logout y mostrar un mensaje de error', () => {
    
        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('debe de cambiar el estado a checking ', () => {
      
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
    })
    
    //toBe es para comparar valores
    //toEqual para comparar objetos
 
});
