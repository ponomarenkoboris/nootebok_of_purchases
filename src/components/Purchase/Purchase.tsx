import { useReducer } from 'react'
import { TPurchaseModel } from '../../models/PurchaseModels'
import { calcProgressBar, reducer, initialState, PurchaseActionTypes } from './utils'
import { useTypedDispatch } from '../../hooks/reduxHooks'
import { purchaseSlice } from '../../store/slices/PurchaseSlice/PurchaseSlice'
import './Purchase.scss'

export const Purchase = ({ id, name, imageUrl, price, cashSavings }: TPurchaseModel) => {
    const [{ isShow, savings }, dispatch] = useReducer(reducer, initialState)
    const { changeCashSavings, removePorchase } = purchaseSlice.actions
    const dispatchStore = useTypedDispatch()

    const confirmSavingsChange = () => {
        dispatchStore(changeCashSavings({ id, cashSavings: savings }))
        dispatch({ type: PurchaseActionTypes.RESET_STATE })
    }

    const removePurchaseFromList = () => {
        const isTrue = window.confirm('Are you sure that you want to delete purchase from list?')
        if (isTrue) dispatchStore(removePorchase(id))
    }

    return (
        <div className="purchase__wrapper">
            <div className="remove-purchase__btn__wrapper">
                <button onClick={removePurchaseFromList} className='remove-purchase__btn'>Remove</button>
            </div>
            <img className='purchase__photo' src={imageUrl} alt="Purchase" />
            <p className='purchase__name'>{name}</p>
            <div className='purchase-cash-savings'>
                <div className='cash__layout'>
                    <p>
                        <span className='cash-savings'>{`$${cashSavings}`}</span>
                        /
                        <span className='price'>{`$${price}`}</span>
                    </p>
                    {isShow && <input type="number" value={savings || ' '} onChange={e => dispatch({ type: PurchaseActionTypes.SET_SAVINGS, payload: Number(e.target.value) })}/>}
                </div>
                <div className="buttons__wrapper">
                    {!isShow 
                    ? <button onClick={() => dispatch({ type: PurchaseActionTypes.SET_ISSHOW, payload: true })}>Add cash</button>
                    : <button onClick={confirmSavingsChange}>Save change</button>
                    }
                </div>
            </div>
            <div className='purchase-progress-bar__wrapper'>
                <div 
                    className="progress-bar"
                    style={{
                        width: `${calcProgressBar(cashSavings, price)}%`
                    }}
                ></div>
            </div>
        </div>
    )
}