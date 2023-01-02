export type TPurchaseModel = {
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    cashSavings: number
}

export type TPurchaseError = string

export interface IPurchase {
    errorPurch: TPurchaseError,
    purchases: TPurchaseModel[],
    isLoading: boolean
}