import { useTypedSelector } from "../../hooks/reduxHooks"
import { Purchase } from '../../components/Purchase/Purchase';
import './Home.scss'

export const Home = () => {
    const { purchases } = useTypedSelector(state => state.purchaseSlice)

    return (
        <div className='home'>
            <div className='purchases-list__wrapper'>
                {purchases.length 
                ? purchases.map(purchase => <Purchase key={purchase.id} {...purchase} />)
                : <h1>Create new Purchase! </h1>
                }
            </div>
        </div>
    )
}