import { TUserData } from '../../models/UserModels'

type TLoginState = TUserData & {
    usernameInputIsActive: boolean,
    passwordInputIsActice: boolean,
    submitInputIsActive: boolean
}

export enum LoginStateActionTypes {
    SET_USERNAME = 'SET_USERNAME',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_USERNAME_INPUT_IS_ACTIVE = 'SET_USERNAME_INPUT_IS_ACTIVE',
    SET_PASSWORD_INPUT_IS_ACTIVE = 'SET_PASSWORD_INPUT_IS_ACTIVE',
    SET_SUBMIT_INPUT_IS_ACTIVE = 'SET_SUBMIT_INPUT_IS_ACTIVE',
    SET_FORM_OUT_OF_FOCUS = 'SET_FORM_OUT_OF_FOCUS'
}

export const initialLoginState: TLoginState = {
    username: '',
    password: '',
    usernameInputIsActive: false,
    passwordInputIsActice: false,
    submitInputIsActive: false
}

type TActionPayload = {
    type: LoginStateActionTypes,
    payload: string | boolean
}

export const loginReducer = (state: TLoginState, action: TActionPayload): TLoginState => {
    switch (action.type) {
        case LoginStateActionTypes.SET_USERNAME:
            return { ...state, username: action.payload as string}
        case LoginStateActionTypes.SET_PASSWORD:
            return { ...state, password: action.payload as string}
        case LoginStateActionTypes.SET_USERNAME_INPUT_IS_ACTIVE:
            return { 
                ...state, 
                usernameInputIsActive: action.payload as boolean, 
                passwordInputIsActice: false,
                submitInputIsActive: false
            }
        case LoginStateActionTypes.SET_PASSWORD_INPUT_IS_ACTIVE:
            return { 
                ...state, 
                passwordInputIsActice: action.payload as boolean, 
                usernameInputIsActive: false,
                submitInputIsActive: false
            }
        case LoginStateActionTypes.SET_SUBMIT_INPUT_IS_ACTIVE:
            return { 
                ...state, 
                submitInputIsActive: action.payload as boolean, 
                usernameInputIsActive: false,
                passwordInputIsActice: false 
            }
        case LoginStateActionTypes.SET_FORM_OUT_OF_FOCUS:
            const isActive = action.payload as boolean
            return { 
                ...state, 
                submitInputIsActive: isActive, 
                usernameInputIsActive: isActive,
                passwordInputIsActice: isActive 
            }
        default:
            return state
    }
}