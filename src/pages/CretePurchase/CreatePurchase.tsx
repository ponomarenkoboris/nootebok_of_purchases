import { ChangeEvent, useRef, useReducer, FormEvent, useContext } from 'react'
import { purchaseInitilaState, reducer, PurchaseStateActionTypes } from './utils'
import { ModalContext } from '../../context/ModalContext'
import { useTypedDispatch } from '../../hooks/reduxHooks'
import { purchaseSlice } from '../../store/slices/PurchaseSlice/PurchaseSlice'
import './CreatePurchase.scss'

export const CreatePurchase = () => {
    const [purchase, dispatch] = useReducer(reducer, purchaseInitilaState)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { createPurchase } = purchaseSlice.actions
    const dispatchStore = useTypedDispatch()
    const { setIsShow } = useContext(ModalContext)

    const clickHandler = () => {
        if (fileInputRef.current) fileInputRef.current.click()    
    }

    const imageChangeHandler = (e: ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files
        if (files && files[0]) {
            const reader = new FileReader()
                        
            reader.onload = ev => {
                const url = ev.target?.result as string
                if (url) {
                    dispatch({ type: PurchaseStateActionTypes.SET_PURCHASE_IMAGE, payload: url })
                }   
            }
            
            reader.readAsDataURL(files[0])
        }
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const { name, cashSavings, price, imageUrl } = purchase
        if (Number.isNaN(cashSavings) || Number.isNaN(price) || !name.length || !imageUrl.length ) {
            setIsShow(true)
            return
        }
        const newPurchase = { ...purchase, id: new Date().getTime()}
        dispatchStore(createPurchase(newPurchase))
        alert('You have creaye purchase successfully!')
        dispatch({ type: PurchaseStateActionTypes.RESET_STATE })
    }

    return (
        <div className="purchase">
            <form onSubmit={submitHandler} className='creation-form'>
                <div className="image-uploader">
                    <div className='image-uploader__wrapper' onClick={clickHandler}>
                        <input 
                            ref={fileInputRef} 
                            accept='image/png, image/jpg, image/jpeg, image/gif'
                            onChange={imageChangeHandler}
                            type="file"
                        />
                        {purchase.imageUrl 
                        ? 
                            <img src={purchase.imageUrl} alt='Purchase' />
                        :
                        <>
                            <p>Upload purchase photo</p>
                        </>
                        }
                    </div>
                </div>
                <label>
                    <p>Create a purchase name:</p>
                    <textarea
                        name="purchaseName" 
                        value={purchase.name}
                        onChange={e => dispatch({ type: PurchaseStateActionTypes.SET_PURCHASE_NAME, payload: e.target.value })}
                    />
                </label>
                <label>
                    <p>Enter purchase total price:</p>
                    <input 
                        type="number" 
                        value={purchase.price || ''} 
                        onChange={e => dispatch({ type: PurchaseStateActionTypes.SET_PURCHASE_PRICE, payload: e.target.value })}
                    />
                </label>
                <label>
                    <p>Enter cash savings you already have:</p>
                    <input 
                        type="number" 
                        value={purchase.cashSavings || ' '} 
                        onChange={e => dispatch({ type: PurchaseStateActionTypes.SET_PURCHASE_CASHSAVINGS, payload: e.target.value})}
                    />
                </label>
                <div className='submit__wrapper'>
                    <button type='submit'>Create</button>
                </div>
            </form>

        </div>
    )
}