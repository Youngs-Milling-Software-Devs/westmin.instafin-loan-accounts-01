import { configureStore } from "@reduxjs/toolkit";
import loanAccountsReducer from "./features/loan-accounts/loan-accounts.slice";
export const store = configureStore({
  reducer: {
    loanAccounts: loanAccountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
