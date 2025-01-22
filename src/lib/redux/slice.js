import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: null,
    transactions: [],
    budgets: [],
    pots: [],
    recurringBills: [],
  },
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.token = action.payload;
    },
    removeUser: (state) => {
      state.user = {
         token: null,
    transactions: [],
    budgets: [],
    pots: [],
    recurringBills: [],
      }
    },
    addTransaction: (state, action) => {
      let data = action.payload;
      const newTransaction = {
        ...data,
        id: Math.floor(Math.random() * 1000),
      };
      state.user.transactions = [...state.user?.transactions, newTransaction];
    },
    addBudget: (state, action) => {
      let data = action.payload;
      const newBudget = {
        ...data,
        id: Math.floor(Math.random() * 1000),
        spent: 0,
      };
      state.user.budgets = [...state.user?.budgets, newBudget];
    },

    editBudget: (state, action) => {
      const { updatedBudget, id } = action.payload;
      const index = state.user.budgets.findIndex((budget) => budget.id === id);
      if (index !== -1) {
        state.user.budgets[index] = {
          ...state.user.budgets[index],
          ...updatedBudget,
        };
      }
    },
    deleteBudget: (state, action) => {
      state.user.budgets = state.user.budgets.filter(
        (budget) => budget.id != action.payload
      );
    },
    addPot: (state, action) => {
      const newPot = {
        ...action.payload,
        id: Math.floor(Math.random() * 1000),
        saved: 0,
      };

      state.user.pots = [...state.user.pots, newPot];
    },

    editPot: (state, action) => {
      const { id, updatedPot } = action.payload;
      const index = state.user.pots.findIndex((pot) => pot.id === id);

      if (index !== -1) {
        state.user.pots[index] = { ...state.user.pots[index], ...updatedPot };
      }
    },
    deletePot: (state, action) => {
      state.user.pots = state.user.pots.filter(
        (pot) => pot.id != action.payload
      );
    },
    addMoney: (state, action) => {
      const { pot, data } = action.payload;
      const pots = state.user.pots;
      const index = pots.findIndex((item) => pot.id === item.id);

      pots[index].saved = pots[index].saved + Number(data.amount);
    },
    withdrawMoney: (state, action) => {
      const { pot, data } = action.payload;
      const pots = state.user.pots;
      const index = pots.findIndex((item) => pot.id === item.id);

      pots[index].saved = pots[index].saved - Number(data.amount);
    },
    setRecurringBills: (state) => {
      state.user.recurringBills = state.user.transactions.filter(
        (item) => item.recurring
      );
    },
  },
});

export const {
  setUser,
  removeUser,
  addTransaction,
  addBudget,
  editBudget,
  deleteBudget,
  addPot,
  editPot,
  deletePot,
  addMoney,
  withdrawMoney,
  setRecurringBills,
} = financeSlice.actions;

export default financeSlice.reducer;
