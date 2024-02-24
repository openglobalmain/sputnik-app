import { Box, FormField, RangeSelector } from "grommet";
import { useDispatch } from "react-redux";
import {
    setDiscountPercentageRange,
    setPriceRange,
    setRatingRange,
    setStockRange,
} from "../../stateManagement/reducers/ProductsInfoSlice";
import { useAppSelector } from "../../stateManagement/hooks/redux";

export const RangeFilterSelector = () => {
    const dispatch = useDispatch();

    const priceRange = useAppSelector(
        (state) => state.products.filters.priceRange
    );
    const discountPercentageRange = useAppSelector(
        (state) => state.products.filters.discountPercentageRange
    );
    const ratingRange = useAppSelector(
        (state) => state.products.filters.ratingRange
    );
    const stockRange = useAppSelector(
        (state) => state.products.filters.stockRange
    );

    return (
        <Box pad="xxsmall" align="center">
            <Box width="medium">
                <FormField name="range" htmlFor="range" label="price range">
                    <RangeSelector
                        id="range"
                        min={0}
                        max={100}
                        label
                        values={priceRange}
                        onChange={(nextRange: any) => {
                            dispatch(setPriceRange(nextRange));
                        }}
                    />
                </FormField>
                <FormField
                    name="range2"
                    htmlFor="range2"
                    label="discount percent range units"
                >
                    <RangeSelector
                        id="range2"
                        min={0}
                        max={100}
                        label={(value: number) => `${value}%`}
                        values={discountPercentageRange}
                        onChange={(nextRange: any) => {
                            dispatch(setDiscountPercentageRange(nextRange));
                        }}
                    />
                </FormField>
                <FormField name="range3" htmlFor="range3" label="rating range">
                    <RangeSelector
                        id="range3"
                        min={0}
                        max={100}
                        label={(value: number) => `${value}%`}
                        values={ratingRange}
                        onChange={(nextRange: any) => {
                            dispatch(setRatingRange(nextRange));
                        }}
                    />
                </FormField>
                <FormField name="range4" htmlFor="range4" label="stock range">
                    <RangeSelector
                        id="range4"
                        min={0}
                        max={100}
                        label={(value: number) => `${value}%`}
                        values={stockRange}
                        onChange={(nextRange: any) => {
                            dispatch(setStockRange(nextRange));
                        }}
                    />
                </FormField>
            </Box>
        </Box>
    );
};
