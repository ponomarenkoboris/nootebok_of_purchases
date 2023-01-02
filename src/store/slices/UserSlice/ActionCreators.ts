import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, TUserData, TLoginErrors } from "../../../models/UserModels";
import { ErrorMessage } from '../../../components/ErrorNotification/utils'
import axios from "axios";

export const login = createAsyncThunk(
    'user/loginUser', 
    async ({ username, password }: TUserData, thunkApi) => {
        try {
            const userList = await axios.get<IUser[]>('./base.json')
            const users = await userList.data
            const user = users.find(({ userInfo }) => userInfo.username === username && userInfo.password === password)
            return user || thunkApi.rejectWithValue({message: ErrorMessage.INPUT_ERROR} as TLoginErrors)
        } catch (error) {
            thunkApi.rejectWithValue({message: ErrorMessage.REQUEST_USER_ERROR} as TLoginErrors)
        }
    }
)