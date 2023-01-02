import { ErrorMessage } from '../components/ErrorNotification/utils'
import { TPurchaseModel } from '../models/PurchaseModels'

export type TUserData = {
    username: string,
    password: string,
    purchases?: TPurchaseModel[]
}

export type TLoginErrors = {
    message: ErrorMessage
}

export interface IUser {
    userInfo: TUserData;
    loginErrors: TLoginErrors
}