import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  firstName: string;
  lastname: string;
  email: string;
  city: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  data: User | null;
}

const initialState: AuthState = {
  loading: false,
  data: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Extract the action creator
export const { setAuthState } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
