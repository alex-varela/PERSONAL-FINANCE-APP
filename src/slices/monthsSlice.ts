// slices/monthsSlice.ts
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  date: string;
  category: string;
  income: number;
  expense: number;
  method: string;
  notes: string;
}

export interface Month {
  id: string;
  name: string;
  income: number;
  expense: number;
  savingGoal: number;
  transactions: Transaction[];
}

const initialState: Month[] = [];

const monthsSlice = createSlice({
  name: "months",
  initialState,
  reducers: {
    addMonth: {
      reducer(state, action: PayloadAction<Month>) {
        state.push(action.payload);
      },
      prepare({
        name,
        income,
        expense,
        savingGoal,
      }: Omit<Month, "id" | "transactions">) {
        return {
          payload: {
            id: nanoid(),
            name,
            income,
            expense,
            savingGoal,
            transactions: [],
          },
        };
      },
    },

    updateMonth: (
      state,
      action: PayloadAction<{ index: number; updatedMonth: Month }>
    ) => {
      const { index, updatedMonth } = action.payload;
      state[index] = updatedMonth;
    },
    addTransaction(
      state,
      action: PayloadAction<{ monthId: string; transaction: Transaction }>
    ) {
      const { monthId, transaction } = action.payload;
      const month = state.find((m) => m.id === monthId);
      if (month) {
        month.transactions.push(transaction);
      }
    },
    updateTransaction: (
      state,
      action: PayloadAction<{
        monthId: string;
        index: number;
        updatedTransaction: Transaction;
      }>
    ) => {
      const { monthId, index, updatedTransaction } = action.payload;
      const month = state.find((m) => m.id === monthId);
      if (month) {
        month.transactions[index] = updatedTransaction;
      }
    },
  },
});

export const { addMonth, updateMonth, updateTransaction, addTransaction } =
  monthsSlice.actions;
export default monthsSlice.reducer;
