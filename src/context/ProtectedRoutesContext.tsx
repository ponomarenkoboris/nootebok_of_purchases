import { useEffect, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../hooks/reduxHooks'
import { Login } from '../pages/Login/Login'

type ProtectedRoutesContextPropsType = {
    children: ReactNode
}

export const ProtectedRoutesContext = ({ children }: ProtectedRoutesContextPropsType) => {
    const { userInfo } = useTypedSelector(state => state.userSlice)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo.username || !userInfo.password) navigate('/login')
        if (userInfo.username && userInfo.password && pathname === '/login') navigate('/')
    }, [pathname])

    return (
        <>
            {userInfo.username && userInfo.password ? children : <Login />}
        </>
    )
}