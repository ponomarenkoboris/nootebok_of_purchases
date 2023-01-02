import { bindActionCreators } from 'redux'
import { useTypedDispatch } from './reduxHooks'
import { allActionCreators } from '../store'

export const useAsyncActions = () => {
    const dispatch = useTypedDispatch()
    const actions = allActionCreators()
    return bindActionCreators(actions, dispatch)
}