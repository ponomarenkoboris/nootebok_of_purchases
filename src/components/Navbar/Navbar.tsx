import { useEffect } from 'react'
import { useAsyncActions } from '../../hooks/useAsyncActions'
import { useTypedSelector } from '../../hooks/reduxHooks'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'

const notAuthPageLinks = [
    {path: 'login', title:'Login'}
]

const authPageLinks = [
    {path: '/', title: 'Home'}, 
    {path: '/create-new-purchase', title: 'Create'},
    {path: '/exit', title: 'Exit'}, 
]

export const Navbar = () => {
    const { userInfo } = useTypedSelector(state => state.userSlice)
    const { purchases } = useTypedSelector(state => state.purchaseSlice)
    const { getPurchases } = useAsyncActions()

    useEffect(() => { if (!purchases.length) getPurchases(userInfo.username) }, [])

    return (
        <header>
            <nav className='navbar'>
                {userInfo.username 
                ? 
                    authPageLinks.map(({path, title}) => 
                        <div key={path} className='link__wrapper'>
                            <NavLink
                                className={({ isActive }) => isActive ? 'page__link-active' : 'page__link'}
                                to={path}
                            >{title}</NavLink>
                        </div>
                    )
                :
                    notAuthPageLinks.map(({path, title}) => 
                        <div key={path} className='link__wrapper'>
                            <NavLink
                                className={({ isActive }) => isActive ? 'page__link-active' : 'page__link'}
                                to={path}
                            >{title}</NavLink>
                        </div>
                    )
                }
            </nav>
        </header>
    )
}