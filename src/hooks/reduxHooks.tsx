import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootStore } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootStore> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>()