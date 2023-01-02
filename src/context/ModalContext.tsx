import { useState, createContext } from "react"
import { Modal } from "../components/Modal/Modal"

type TModal = {
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}
const initialValue: TModal = {
    setIsShow: () => {}
}

export const ModalContext = createContext<TModal>(initialValue)

type TModalContextProviderProps = {
    children: JSX.Element
}

export const ModalContextProvider = ({ children }: TModalContextProviderProps) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    
    return (
        <ModalContext.Provider value={{ setIsShow }}>             
            <>
                {children}
                {isShow && <Modal name='Error' text="Empty parameters" onClose={() => { setIsShow(false) }}/>}
            </>
        </ModalContext.Provider>
    )
}