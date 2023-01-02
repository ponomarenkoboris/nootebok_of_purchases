import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPurchase, TPurchaseModel } from "../../../models/PurchaseModels";
import { getPurchases } from './ActionCreators'

export const purchaseState: IPurchase = {
    errorPurch: '',
    isLoading: false,
    purchases: []
}

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: purchaseState,
    reducers: {
        removePorchase(state, action: PayloadAction<number>) {
            state.purchases = state.purchases.filter(({ id: purchaseId }) => action.payload !== purchaseId)
        },
        changeCashSavings(state, action: PayloadAction<{ id: number, cashSavings: number }>) {
            for (let i = 0; i < state.purchases.length; i++) {
                if (state.purchases[i].id === action.payload.id) {
                    state.purchases[i].cashSavings = state.purchases[i].cashSavings + action.payload.cashSavings
                    break
                }
            }
        },
        createPurchase(state, action: PayloadAction<TPurchaseModel>) {
            const { name, imageUrl, price, cashSavings } = action.payload
            if (name.length || imageUrl.length || price || cashSavings) state.purchases.push(action.payload)
        }
    },
    extraReducers: {
        [getPurchases.fulfilled.type]: (state, action: PayloadAction<TPurchaseModel[]>) => {
            state.isLoading = false
            state.purchases = action.payload
        },
        [getPurchases.pending.type]: (state) => {
            state.isLoading = true
        },
        [getPurchases.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.errorPurch = action.payload
        },
    }
})

export default purchaseSlice.reducer