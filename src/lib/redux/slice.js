import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    token : null,
    transactions: [],
    budgets: [],
    pots: [],
    recurringBills: []
  },
}

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setUser: (state, action) => {

      state.user.token= action.payload
    },
    removeUser: (state) => {
      state.user.token = null
    },
   addTransaction: (state, action) => {
    let data = action.payload
    const newTransaction = {
        ...data,
        id: Math.floor(Math.random() * 1000),
      };
  state.user.transactions = [...state.user?.transactions, newTransaction]
   },
   addBudget: (state,action) => {
    let data = action.payload
    const newBudget = {
      ...data,
      id: Math.floor(Math.random() * 1000),
      spent: 0,
  }
  state.user.budgets = [...state.user?.budgets, newBudget]
  },
  deleteBudget: (state,action) => {
    state.user.budgets = state.user.budgets.filter((item) => item.id != action.payload)
  },
  setRecurringBills: (state,action) => {
    state.user.recurringBills = state.user.transactions.filter((item) => item.recurring )
  },
}
})


export const { setUser, removeUser, addTransaction, addBudget, deleteBudget, setRecurringBills } = financeSlice.actions

export default financeSlice.reducer