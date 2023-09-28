import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/storage";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;