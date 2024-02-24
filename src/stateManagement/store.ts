import { configureStore } from "@reduxjs/toolkit";
import productsInfoReducer from "./reducers/ProductsInfoSlice";
import { dummyApi } from "../api/apiSlice";

export const store = configureStore({
    reducer: {
        [dummyApi.reducerPath]: dummyApi.reducer,
        products: productsInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([dummyApi.middleware]),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
