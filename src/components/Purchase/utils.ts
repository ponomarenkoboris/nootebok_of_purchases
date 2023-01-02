const priceToNumber = (val: string): number => {
    const arr = val.split('')
    if (arr.at(0) === '$')arr.shift()
    return Number(arr.join(''))
}

export const calcProgressBar = (curr: string | number, max: string | number): number => {
    const [partialValue, totalValue] = [typeof curr === 'string' ? priceToNumber(curr) : curr, typeof max === 'string' ? priceToNumber(max) : max]
    const progressbarWidth = (partialValue * 100) / totalValue
    return progressbarWidth > 100 ? 100 : progressbarWidth
}

type TPurchaseState = {
    isShow: boolean,
    savings: number
}

export const initialState: TPurchaseState = {
    isShow: false,
    savings: 0
}
export enum PurchaseActionTypes {
    SET_ISSHOW = 'SET_ISSHOW',
    SET_SAVINGS = 'SET_SAVINGS',
    RESET_STATE = 'RESET_STATE'
}
type TPurchaseActionType = {
    type: PurchaseActionTypes,
    payload?: number | boolean
}

export const reducer = (state: TPurchaseState, action: TPurchaseActionType): TPurchaseState => {
    switch (action.type) {
        case PurchaseActionTypes.SET_ISSHOW:
            return { ...state, isShow: action.payload as boolean }
        case PurchaseActionTypes.SET_SAVINGS:
            return { ...state, savings: action.payload as number }
        case PurchaseActionTypes.RESET_STATE:
            return { isShow: false, savings: 0 }
        default:
            return state
    }
}