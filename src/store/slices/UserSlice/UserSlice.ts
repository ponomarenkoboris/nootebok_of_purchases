import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser, TLoginErrors } from "../../../models/UserModels"
import { ErrorMessage } from '../../../components/ErrorNotification/utils'
import { login } from './ActionCreators'


const initialState: IUser = {
    userInfo: {
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
    },
    loginErrors: {
        message: ErrorMessage.SUCCESS
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cleanError(state) {
            state.loginErrors.message = ErrorMessage.SUCCESS
        },
        logout(state) {
            state.userInfo = { username: '', password: '' }
            localStorage.removeItem('username')
            localStorage.removeItem('password')
        }
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            [state.userInfo, state.loginErrors] = [action.payload.userInfo, { message: ErrorMessage.SUCCESS }]
            localStorage.setItem('username', action.payload.userInfo.username)
            localStorage.setItem('password', action.payload.userInfo.password)
        },
        [login.rejected.type]: (state, action: PayloadAction<TLoginErrors>) => {
            state.loginErrors = action.payload
        }
    }
})

export default userSlice.reducer