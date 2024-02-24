import { Box, Grid, Pagination, Tab, Tabs } from "grommet";
import { AppsRounded, BladesVertical } from "grommet-icons";
import { ProductCard } from "../../ProductCard";
import { FilterLayer } from "../../../widgets/filters/FilterLayer";
import { useAppSelector } from "../../../stateManagement/hooks/redux";
import { useDispatch } from "react-redux";
import {
    applyTableMode,
    setActualPage,
} from "../../../stateManagement/reducers/ProductsInfoSlice";
import { IProduct } from "../../../models/IProduct";
import { ProductsTable } from "../../../widgets/table/ProductsTable";

export const MobileVersionOfCardsList = () => {
    const dispatch = useDispatch();

    const page = useAppSelector((state) => state.products.actualPage);
    const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);

    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );
    const paginatedData = useAppSelector(
        (state) => state.products.paginatedData
    );
    const isTableModeOn = useAppSelector(
        (state) => state.products.isTableModeOn
    );

    const handleTableClick = () => {
        dispatch(applyTableMode({ clicked: true }));
    };
    const handleCardsClick = () => {
        dispatch(applyTableMode({ clicked: false }));
    };

    return (
        <Grid
            rows={["fit"]}
            columns={["fit"]}
            gap="small"
            areas={[["upperHeader"], ["header"], ["main"], ["footer"]]}
        >
            <Box
                gridArea="upperHeader"
                background="brand"
                align="center"
                pad="medium"
            >
                <Tabs>
                    <Tab
                        title="Table"
                        icon={<BladesVertical />}
                        onClick={handleTableClick}
                    ></Tab>
                    <Tab
                        title="Cards"
                        icon={<AppsRounded />}
                        onClick={handleCardsClick}
                    ></Tab>
                </Tabs>
            </Box>

            <Box
                gridArea="header"
                direction="row"
                align="end"
                justify="center"
                background="light-2"
                pad="xxsmall"
            >
                <FilterLayer />
            </Box>

            <Box gridArea="main" background="light-2" justify="start">
                {isTableModeOn ? (
                    <ProductsTable />
                ) : (
                    <div className="productsCase">
                        <Grid
                            columns={{
                                count: "fit",
                                size: "medium",
                            }}
                            rows="small"
                            gap="medium"
                        >
                            {paginatedData.products.map((product: IProduct) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    </div>
                )}
            </Box>

            <Box background="brand" gridArea="footer" round="medium">
                <Box align="center">
                    {!isTableModeOn && (
                        <Pagination
                            numberItems={filteredData.products.length}
                            page={page}
                            step={itemsPerPage}
                            onChange={(selectedPage: any) => {
                                dispatch(setActualPage(selectedPage.page));
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Grid>
    );
};
