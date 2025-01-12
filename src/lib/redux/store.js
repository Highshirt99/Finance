import { configureStore } from '@reduxjs/toolkit'
import financeReducer from './slice'


export const store = configureStore({
  reducer: {
    finance: financeReducer
  },
})