import { Navigate } from "react-router-dom"
import { userSlice } from "../../store/slices/UserSlice/UserSlice"
import { useTypedDispatch } from "../../hooks/reduxHooks"

export const Exit = () => {
    const { logout } = userSlice.actions
    const dispatch = useTypedDispatch()
    dispatch(logout())
    return <Navigate to='/'/> 
}