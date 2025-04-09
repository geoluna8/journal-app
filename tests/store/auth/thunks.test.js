import { loginWithEmailAndPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailAndPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
  
    test('debe de invocar el checkingCredentials ', async() => {
        //const valor = checkingCredentials();
        //console.log(valor); { type: 'auth/checkingCredentials', payload: undefined }

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login ', async () => {

        const loginData = { ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch ); 

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error ', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en google'};
        await signInWithGoogle.mockResolvedValue( loginData ); // este es el mock de la respuesta

        // thunk
        await startGoogleSignIn()( dispatch ); 

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });


    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito ', async () => {
      
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', };

        await loginWithEmailAndPassword.mockResolvedValue( loginData );

        await startLoginWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });
    
    test('startLogout debe de llamar logoutFirebase, clearNotes y logout ', async () => {
      
        await startLogout()(dispatch); // doble parentesis significa que llama la funcion adentro de la funcion o sea el return async (dispatch) => () dentro del metodo
        
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });
    
    // TODO: Realizar pruebas faltantes

})
