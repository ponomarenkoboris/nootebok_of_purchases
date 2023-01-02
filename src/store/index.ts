import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { login } from "./slices/UserSlice/ActionCreators";
import { getPurchases } from "./slices/PurchaseSlice/ActionCreators";
import userSlice from './slices/UserSlice/UserSlice'
import purchaseSlice from './slices/PurchaseSlice/PurchaseSlice'

const rootReducer = combineReducers({
    userSlice,
    purchaseSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export const allActionCreators = () => {
    return {
        login,
        getPurchases,
    }
}

export type RootStore = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']