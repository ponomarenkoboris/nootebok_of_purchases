
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorMessage } from '../../../components/ErrorNotification/utils'
import { IUser, TUserData } from "../../../models/UserModels";
import axios from 'axios'

export const getPurchases = createAsyncThunk(
    'purchases/getPurchases',
    async (username: TUserData['username'], thunkApi) => {
        try {
            const response = await axios.get<IUser[]>('./base.json')
            const users = await response.data
            const user = users.find(({ userInfo }) => userInfo.username === username)
            const purchases = user?.userInfo.purchases
            return purchases || []
        } catch (error) {
            thunkApi.rejectWithValue(ErrorMessage.REQUEST_PURCHASES_ERROR)
        }
    }
)