type TPurchaseState = {
    imageUrl: string,
    name: string,
    price: number,
    cashSavings: number
}

export const purchaseInitilaState: TPurchaseState = {
    imageUrl: '',
    name: '',
    price: 0,
    cashSavings: 0
}

export enum PurchaseStateActionTypes {
    SET_PURCHASE_IMAGE = 'SET_PURCHASE_IMAGE',
    SET_PURCHASE_NAME = 'SET_PURCHASE_NAME',
    SET_PURCHASE_PRICE = 'SET_PURCHASE_PRICE',
    SET_PURCHASE_CASHSAVINGS = 'SET_PURCHASE_CASHSAVINGS',
    RESET_STATE = 'RESET_STATE'
}

type TPurchaseAction = {
    type: PurchaseStateActionTypes,
    payload?: string
}

export const reducer = (state: TPurchaseState, action: TPurchaseAction): TPurchaseState => {
    switch (action.type) {
        case PurchaseStateActionTypes.SET_PURCHASE_IMAGE:
            return { ...state, imageUrl: action.payload as string }
        case PurchaseStateActionTypes.SET_PURCHASE_NAME:
            return { ...state, name: action.payload as string }
        case PurchaseStateActionTypes.SET_PURCHASE_PRICE:
            const price = action.payload as string
            if (Number.isNaN(price) || Number(price) <= 0) return { ...state, price: 0 }
            return { ...state, price: Number(action.payload) }
        case PurchaseStateActionTypes.SET_PURCHASE_CASHSAVINGS:
            const cashSavings = action.payload as string
            if (Number.isNaN(cashSavings) || Number(cashSavings) <= 0) return { ...state, cashSavings: 0 }
            return { ...state, cashSavings: Number(action.payload) }
        case PurchaseStateActionTypes.RESET_STATE:
            return purchaseInitilaState
        default:
            return state
    }
}