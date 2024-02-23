import { useEffect } from "react";
import { ResponsiveContext, Spinner } from "grommet";
import { useDispatch } from "react-redux";
import { MobileVersionOfCardsList } from "./MobileVersionOfCardsList";
import { FullVersionOfCardsList } from "./FullVersionOfCardsList/FullVersionOfCardsList";
import { useGetAllProductsQuery } from "../../api/componentsApiSlice/productsApiSlice";
import {
    setFilteredData,
    setNewData,
    setPaginatedData,
} from "../../stateManagement/reducers/ProductsInfoSlice";
import { useAppSelector } from "../../stateManagement/hooks/redux";
import {
    getItemWebStorage,
    setItemWebStorage,
} from "../../features/webStorageSaver";
import { IProduct } from "../../models/IProduct";
import { IProductsData } from "../../stateManagement/storeModels/IProductsData";

export const ProductsCardsList = () => {
    const dispatch = useDispatch();

    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );
    const paginatedData = useAppSelector(
        (state) => state.products.paginatedData
    );
    const filtersBrand = useAppSelector(
        (state) => state.products.filters.brand
    );
    const filtersCategory = useAppSelector(
        (state) => state.products.filters.category
    );
    const filtersPrice = useAppSelector(
        (state) => state.products.filters.priceRange
    );
    const filtersRating = useAppSelector(
        (state) => state.products.filters.ratingRange
    );
    const filtersDiscountPercentage = useAppSelector(
        (state) => state.products.filters.discountPercentageRange
    );
    const filtersStock = useAppSelector(
        (state) => state.products.filters.stockRange
    );
    const currentPage = useAppSelector((state) => state.products.actualPage);
    const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);

    const {
        data: allProducts,
        isLoading,
        isError,
        isSuccess,
    } = useGetAllProductsQuery({});

    useEffect(() => {
        if (allProducts) {
            dispatch(setNewData(allProducts));
            setItemWebStorage("filteredData", allProducts);
        }
    }, [allProducts]);

    useEffect(() => {
        if (allProducts) {
            dispatch(
                setPaginatedData(
                    paginationExample(filteredData) ||
                        getItemWebStorage("filteredData")
                )
            );
        }
    }, [currentPage, itemsPerPage, filteredData]);
    useEffect(() => {
        if (getItemWebStorage("filteredData")) {
            dispatch(
                setFilteredData(
                    filterNewData(
                        allProducts || getItemWebStorage("filteredData")
                    )
                )
            );
        }
    }, [
        allProducts,
        filtersBrand,
        filtersCategory,
        filtersPrice,
        filtersRating,
        filtersStock,
        filtersDiscountPercentage,
    ]);

    const filterNewData = (allProducts: IProductsData) => {
        const result = { ...allProducts };

        if (result.products && filtersCategory.length > 0) {
            result.products = result.products.filter((product: IProduct) =>
                filtersCategory.includes(product.category)
            );
        }

        if (result.products && filtersBrand.length > 0) {
            result.products = result.products.filter((product) =>
                filtersBrand.includes(product.brand)
            );
        }
        if (
            result.products &&
            filtersPrice.length === 2 &&
            !filtersPrice.every((val, index) => val === [0, 0][index])
        ) {
            result.products = result.products.filter(
                (product: IProduct) =>
                    product.price >= filtersPrice[0] &&
                    product.price <= filtersPrice[1]
            );
        }

        if (
            result.products &&
            filtersDiscountPercentage.length === 2 &&
            !filtersDiscountPercentage.every(
                (val, index) => val === [0, 0][index]
            )
        ) {
            result.products = result.products.filter(
                (product: IProduct) =>
                    product.price >= filtersDiscountPercentage[0] &&
                    product.price <= filtersDiscountPercentage[1]
            );
        }

        if (
            result.products &&
            filtersRating.length === 2 &&
            !filtersRating.every((val, index) => val === [0, 0][index])
        ) {
            result.products = result.products.filter(
                (product: IProduct) =>
                    product.price >= filtersRating[0] &&
                    product.price <= filtersRating[1]
            );
        }

        if (
            result.products &&
            filtersStock.length === 2 &&
            !filtersStock.every((val, index) => val === [0, 0][index])
        ) {
            result.products = result.products.filter(
                (product: IProduct) =>
                    product.price >= filtersStock[0] &&
                    product.price <= filtersStock[1]
            );
        }

        return result;
    };

    const paginationExample = (filteredData: IProductsData) => {
        const result = { products: [...filteredData.products].reverse() };

        if (result.products && result.products.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = currentPage * itemsPerPage;
            result.products = result.products.slice(startIndex, endIndex);
        }

        return result;
    };

    return (
        <div>
            {!paginatedData ? (
                <Spinner />
            ) : (
                <ResponsiveContext.Consumer>
                    {(size) =>
                        size === "small" ? (
                            <MobileVersionOfCardsList />
                        ) : (
                            <FullVersionOfCardsList />
                        )
                    }
                </ResponsiveContext.Consumer>
            )}
        </div>
    );
};
