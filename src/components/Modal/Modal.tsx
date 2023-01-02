import './Modal.scss'

type TModal = { 
    name: 'Warning' | 'Error'
    text: string, 
    onClose: () => void 
}

export const Modal = ({ name, text, onClose }: TModal) => {
    return (
        <div className='modal__wrapper'>
            <div className='modal'>
                <div className="modal__header">
                    <p>{name}</p>
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="modal__text-wrapper">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}