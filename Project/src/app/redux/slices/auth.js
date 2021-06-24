import { createSlice } from "@reduxjs/toolkit";
import userTypes from "../../enums/userTypes";

const initialStateObject = {
   authenticated: false,
   accessToken: null,
   type: "",
};

export const getAuthenticated = (state) => state.authenticated;
export const getType = (state) => state.type;

export const authenticationSlice = createSlice({
   name: "authentication",
   initialState: initialStateObject,
   reducers: {
      login: (state, action) => {
         return {
            ...action.payload,
            type: userTypes[1], //TODO: change later
            authenticated: true,
         };
      },
      logout: () => {
         return initialStateObject;
      },
   },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
