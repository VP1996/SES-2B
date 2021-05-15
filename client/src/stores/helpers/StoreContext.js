import { createContext } from 'react'
import RootStore from '../RootStore'

export const StoreContext = createContext(new RootStore());
export const StoreProvider = StoreContext.Provider;