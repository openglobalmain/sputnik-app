import { IProduct } from "../../models/IProduct";
import { IProductsData } from "./IProductsData";

export interface IProductsAction {
    isTableModeOn: boolean;
    someDeletedFlag: boolean;
    filters: {
        priceRange: [number, number];
        discountPercentageRange: [number, number];
        ratingRange: [number, number];
        stockRange: [number, number];
        brand: string[];
        category: string[];
    };
    actualPage: number;
    itemsPerPage: number;
    actualObjectData: IProductsData;
    filteredObjectData: IProductsData;
    paginatedData: IProductsData;
    updatedObject: IProduct;
    newAddedObject: IProduct;
    updateAlert: boolean;
}
