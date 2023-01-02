import { useNavigate } from 'react-router-dom'
import { FormEvent, useReducer, FocusEvent } from 'react'
import { loginReducer, initialLoginState, LoginStateActionTypes } from './utils'
import { useAsyncActions } from '../../hooks/useAsyncActions'
import './Login.scss'


export const Login = () => {
    const { login } = useAsyncActions()
    const navigate = useNavigate()
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        Promise.resolve(login({ username: loginState.username, password: loginState.password })).then(() => navigate('/'))
    }

    const formFoucusHandler = (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement
        if (inputElement.name === 'username') dispatch({ type: LoginStateActionTypes.SET_USERNAME_INPUT_IS_ACTIVE, payload: true })
        if (inputElement.name === 'password') dispatch({ type: LoginStateActionTypes.SET_PASSWORD_INPUT_IS_ACTIVE, payload: true })
        if (inputElement.name === 'submitButton') dispatch({ type: LoginStateActionTypes.SET_SUBMIT_INPUT_IS_ACTIVE, payload: true })
    }

    const formOutOfFocus = () => {
        dispatch({ type: LoginStateActionTypes.SET_FORM_OUT_OF_FOCUS, payload: false })
    }

    return (
        <main className="login__page">
            <div className="login__wrapper">
                <h1>Welcome!</h1>
                <form 
                    onFocus={formFoucusHandler} 
                    onBlur={formOutOfFocus}
                    className="login__form"
                >
                    <label className={loginState.usernameInputIsActive ? 'active__label' : 'input__label'}>
                        <p>Username:</p>
                        <input 
                            type="text" 
                            value={loginState.username} 
                            name="username" 
                            onChange={e => dispatch({ type: LoginStateActionTypes.SET_USERNAME, payload: e.target.value })}
                        />
                    </label>
                    <label className={loginState.passwordInputIsActice ? 'active__label' : 'input__label'}>
                        <p>Password:</p>
                        <input 
                            type="password"  
                            name="password" 
                            value={loginState.password} 
                            onChange={e => dispatch({ type: LoginStateActionTypes.SET_PASSWORD, payload: e.target.value })}
                        />
                    </label>
                    <input 
                        type='button' 
                        onClick={submitHandler}
                        className={loginState.submitInputIsActive ? 'active__submit' : 'form__submit'}
                        name='submitButton'
                        value={'Go!'}
                    />
                </form>
            </div>
        </main>
    )
}