import { createAsyncThunk } from "@reduxjs/toolkit";

export const loanAccountsEffects = createAsyncThunk(
  "loanAccounts/fetch",
  async (
    { startDate, endDate }: { startDate: string; endDate: string },
    { rejectWithValue },
  ) => {
    try {
      // Example API call to fetch loan accounts
      const response = await fetch("/api/submit-instafin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(`Failed to fetch loan accounts, ${error}`);
    }
  },
);
