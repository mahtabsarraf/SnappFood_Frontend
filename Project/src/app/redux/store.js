import {
   configureStore,
   combineReducers,
   getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import clientOrderReducer from "./slices/clientOrder";

const persistConfig = {
   key: "root",
   storage: storage,
};

const rootReducer = combineReducers({
   authentication: authReducer,
   clientOrder: clientOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
});

export const persistor = persistStore(store);

export default store;
