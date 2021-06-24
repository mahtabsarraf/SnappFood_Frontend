import { createSlice } from "@reduxjs/toolkit";

const initialStateObject = {
   restaurantId: null,
   restaurantName: null,
   userId: null,
   foods: [],
   deliveryTime: null,
   deliveryCost: 0,
   price: 0,
   status: "new",
};

export const getFoods = (state) => state.clientOrder.foods;
export const getOrder = (state) => state.clientOrder;

export const clientOrderSlice = createSlice({
   name: "clientOrder",
   initialState: initialStateObject,
   reducers: {
      chooseRestaurant: (state, action) => {
         state.restaurantId = action.payload.restaurantId;
         state.deliveryCost = action.payload.deliveryCost;
         state.status = "new";
         state.deliveryTime = action.payload.deliveryTime;
         state.restaurantName = action.payload.restaurantName;
         state.foods = [];
         state.price = 0;
      },
      addFood: (state, action) => {
         if (state.restaurantId === action.payload.restaurantId) {
            state.foods.push(action.payload);
            state.price += action.payload.price * action.payload.quantity;
         }
      },
      increaseQuantity: (state, action) => {
         state.foods[action.payload].quantity++;
         state.price += state.foods[action.payload].price;
      },
      decreaseQuantity: (state, action) => {
         state.foods[action.payload].quantity--;
         state.price -= state.foods[action.payload].price;
      },
      removeFood: (state, action) => {
         const removedFood = state.foods[action.payload];
         state.foods.splice(action.payload, 1);
         state.price -= removedFood.quantity * removedFood.price;
      },
   },
});

export const {
   addFood,
   chooseRestaurant,
   decreaseQuantity,
   increaseQuantity,
   removeFood,
} = clientOrderSlice.actions;

export default clientOrderSlice.reducer;
