import { createSlice } from "@reduxjs/toolkit";

const initialStateObject = {
   restaurantId: null,
   userId: null,
   foods: [],
   deliveryTime: null,
   deliveryCost: 0,
   price: 0,
   status: "waiting",
};

export const getFoods = (state) => state.clientOrder.foods;

export const clientOrderSlice = createSlice({
   name: "clientOrder",
   initialState: initialStateObject,
   reducers: {
      chooseRestaurant: (state, action) => {
         state.restaurantId = action.payload;
         state.foods = [];
      },
      addFood: (state, action) => {
         if (state.restaurantId === action.payload.restaurantId) {
            state.foods.push(action.payload);
         }
      },
   },
});

export const { addFood, chooseRestaurant } = clientOrderSlice.actions;

export default clientOrderSlice.reducer;
