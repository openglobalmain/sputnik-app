import { Box, Data, DataFilter, DataFilters, Text } from "grommet";
import { FilterLayer } from "../FilterLayer";
import { useAppSelector } from "../../../stateManagement/hooks/redux";
import {
    setBrand,
    setCategory,
} from "../../../stateManagement/reducers/ProductsInfoSlice";
import { useDispatch } from "react-redux";
import { useGetAllCategoryQuery } from "../../../api/componentsApiSlice/productsApiSlice";

export const LeftSideFilters = () => {
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
    }

    return (
        <Box align="center" justify="start" pad="medium" gap="small">
            <Text color="dark-1">Category Filters:</Text>
            {currentData &&
                currentData.products &&
                currentData.products.length > 0 && (
                    <Data data={currentData.products} onSubmit={handleFilter}>
                        <DataFilters updateOn={"submit"}>
                            <DataFilter property="brand" />
                            <DataFilter
                                property="category"
                                options={categoriesData}
                            />
                        </DataFilters>
                    </Data>
                )}
            <Box
                pad="medium"
                align="center"
                justify="center"
                border={true}
                round="small"
            >
                <Text color="dark-1">Other Filters:</Text>
                <FilterLayer />
            </Box>
        </Box>
    );
};
