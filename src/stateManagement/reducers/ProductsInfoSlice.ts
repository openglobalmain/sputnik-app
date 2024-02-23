import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    getItemWebStorage,
    setItemWebStorage,
} from "../../features/webStorageSaver";
import { IProductsAction } from "../storeModels/IProduct";
import { exampleData } from "../../assets/dataExamples/exampleOfData";

const initialState: IProductsAction = {
    isTableModeOn: getItemWebStorage("isTableModeOn"),
    someDeletedFlag: false,
    filters: {
        priceRange: [0, 0],
        discountPercentageRange: [0, 0],
        ratingRange: [0, 0],
        stockRange: [0, 0],
        brand: [],
        category: [],
    },
    actualPage: 1,
    itemsPerPage: getItemWebStorage("itemsPerPage") || 10,
    actualObjectData: getItemWebStorage("filteredData") || exampleData,
    filteredObjectData: getItemWebStorage("filteredData") || exampleData,
    paginatedData: getItemWebStorage("filteredData") || exampleData,
    updatedObject: exampleData.products[0],
    newAddedObject: exampleData.products[0],
    updateAlert: false,
};

export const productsInfoSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setPriceRange: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        setDiscountPercentageRange: (state, action) => {
            state.filters.discountPercentageRange = action.payload;
        },
        setRatingRange: (state, action) => {
            state.filters.ratingRange = action.payload;
        },
        setStockRange: (state, action) => {
            state.filters.stockRange = action.payload;
        },
        setBrand: (state, action) => {
            state.filters.brand = action.payload;
        },
        setCategory: (state, action) => {
            state.filters.category = action.payload;
        },
        setActualPage: (state, action) => {
            state.actualPage = action.payload;
        },
        setItemsPerPagePage: (state, action) => {
            state.itemsPerPage = action.payload;
        },
        setNewData: (state, action) => {
            state.actualObjectData = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredObjectData = action.payload;
            setItemWebStorage("filteredData", action.payload);
        },
        setPaginatedData: (state, action) => {
            state.paginatedData = action.payload;
        },
        applyTableMode(state, action: PayloadAction<{ clicked: boolean }>) {
            state.isTableModeOn = action.payload.clicked;
        },
        someDeletedFlag(state, action: PayloadAction<{ clicked: boolean }>) {
            state.someDeletedFlag = action.payload.clicked;
        },
        setNewAddedObject(state, action) {
            state.newAddedObject = action.payload;
        },
        setUpdatedCustomizeObject(state, action) {
            state.updatedObject = action.payload;
        },
    },
});

export const {
    setPriceRange,
    setDiscountPercentageRange,
    setRatingRange,
    setStockRange,
    setBrand,
    setCategory,
    applyTableMode,
    setActualPage,
    setNewData,
    setFilteredData,
    setNewAddedObject,
    setUpdatedCustomizeObject,
    setPaginatedData,
    setItemsPerPagePage,
} = productsInfoSlice.actions;
export default productsInfoSlice.reducer;
