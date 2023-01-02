import { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks'
import { userSlice } from '../../store/slices/UserSlice/UserSlice'
import './ErrorNotification.scss'

type TErrorNotificationProps = {
    showingTime: number
}


export const ErrorNotification = (props: TErrorNotificationProps) => {
    const { loginErrors } = useTypedSelector(state => state.userSlice)
    const dispatch = useTypedDispatch()
    const { cleanError } = userSlice.actions
    const { showingTime } = props

    useEffect(() => {
        if (loginErrors.message) {
            setTimeout(() => dispatch(cleanError()), showingTime)
        }
    }, [loginErrors.message])

    return (
        <div 
            className='error'
            style={{ display: loginErrors.message ? 'flex' : 'none' }}
        >
                <div 
                    className='error-notificaton__wrapper' 
                >
                <p className='error-text'>
                    <span>!</span>
                    {loginErrors.message}
                </p>
            </div>
        </div>
    )
}