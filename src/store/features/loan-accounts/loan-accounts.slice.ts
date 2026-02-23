import { createSlice } from "@reduxjs/toolkit";
import { loanAccountsEffects } from "./loan-accounts.effects";
import { IDataItems } from "@/_types";

interface InitialState {
  loanAccounts: IDataItems;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  loanAccounts: {} as IDataItems,
  isLoading: false,
  error: null,
};

const loanAccountsSlice = createSlice({
  name: "loanAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loanAccountsEffects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loanAccountsEffects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loanAccounts = action.payload;
      })
      .addCase(loanAccountsEffects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch loan accounts";
      });
  },
});

export default loanAccountsSlice.reducer;
