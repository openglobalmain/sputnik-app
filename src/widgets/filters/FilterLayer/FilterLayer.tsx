import { Box, Data, DataFilter, DataFilters, ResponsiveContext } from "grommet";
import { useAppSelector } from "../../../stateManagement/hooks/redux";
import { useDispatch } from "react-redux";
import {
    setBrand,
    setCategory,
    setDiscountPercentageRange,
    setPriceRange,
    setRatingRange,
    setStockRange,
} from "../../../stateManagement/reducers/ProductsInfoSlice";
import { useGetAllCategoryQuery } from "../../../api/componentsApiSlice/productsApiSlice";

export const FilterLayer = () => {
    const dispatch = useDispatch();

    const { data: categoriesData } = useGetAllCategoryQuery({});

    const currentData = useAppSelector(
        (state) => state.products.actualObjectData
    );

    function handleFilter(event: any) {

        if (
            event.value &&
            event.value.category &&
            event.value.category.length
        ) {
            dispatch(setCategory(event.value.category));
        } else {
            dispatch(setCategory([]));
        }

        if (event.value && event.value.brand && event.value.brand.length) {
            dispatch(setBrand(event.value.brand));
        } else {
            dispatch(setBrand([]));
        }

        if (event.value && event.value.price) {
            dispatch(setPriceRange(event.value.price._range));
        } else {
            dispatch(setPriceRange([0, 0]));
        }

        if (
            event.value &&
            event.value.discountPercentage &&
            event.value.discountPercentage.length
        ) {
            dispatch(
                setDiscountPercentageRange(
                    event.value.discountPercentage._range
                )
            );
        } else {
            dispatch(setDiscountPercentageRange([0, 0]));
        }

        if (event.value && event.value.stock && event.value.stock.length) {
            dispatch(setStockRange(event.value.stock._range));
        } else {
            dispatch(setStockRange([0, 0]));
        }

        if (event.value && event.value.rating && event.value.rating.length) {
            dispatch(setRatingRange(event.value.rating._range));
        } else {
            dispatch(setRatingRange([0, 0]));
        }
    }

    return (
        <ResponsiveContext.Consumer>
            {(size) =>
                size === "small" ? (
                    <Box pad="xsmall" align="center">
                        <Data
                            justify="center"
                            alignSelf="center"
                            data={currentData.products}
                            onSubmit={handleFilter}
                        >
                            <DataFilters
                                justify="center"
                                align="center"
                                updateOn={"submit"}
                                layer
                            >
                                <DataFilter property="brand" />
                                <DataFilter
                                    options={categoriesData}
                                    property="category"
                                />
                                <DataFilter property="price" />
                                <DataFilter property="discountPercentage" />
                                <DataFilter property="stock" />
                                <DataFilter property="rating" />
                            </DataFilters>
                        </Data>
                    </Box>
                ) : (
                    <Box pad="xsmall">
                        <Data
                            justify="center"
                            alignSelf="center"
                            data={currentData.products}
                            onSubmit={handleFilter}
                        >
                            <DataFilters
                                justify="center"
                                width={"80px"}
                                updateOn={"submit"}
                                layer
                            >
                                <DataFilter property="brand" />
                                <DataFilter
                                    options={categoriesData}
                                    property="category"
                                />
                                <DataFilter property="price" />
                                <DataFilter property="discountPercentage" />
                                <DataFilter property="stock" />
                                <DataFilter property="rating" />
                            </DataFilters>
                        </Data>
                    </Box>
                )
            }
        </ResponsiveContext.Consumer>
    );
};
