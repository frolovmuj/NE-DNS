import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import {RootState} from '../redux/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

