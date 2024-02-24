import { Box, Grid, Pagination, Tab, Tabs } from "grommet";
import { AppsRounded, BladesVertical } from "grommet-icons";
import { ProductCard } from "../../ProductCard";
import { useDispatch } from "react-redux";
import {
    applyTableMode,
    setActualPage,
} from "../../../stateManagement/reducers/ProductsInfoSlice";
import { LeftSideFilters } from "../../../widgets/filters/LeftSideFilters";
import { ProductsTable } from "../../../widgets/table/ProductsTable";
import { useAppSelector } from "../../../stateManagement/hooks/redux";
import { IProduct } from "../../../models/IProduct";
import { NewProductForm } from "../../NewProductForm";

export const FullVersionOfCardsList = () => {
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
        <Box justify="center" fill>
            <Box alignSelf="center" align="center">
                <Grid
                    rows={["xsmall", "xsmall", "fit"]}
                    columns={["small", isTableModeOn ? "xlarge" : "large"]}
                    gap="small"
                    areas={[
                        ["upperHeader", "upperHeader"],
                        ["header", "header"],
                        ["sidebar", "main"],
                        ["footer", "footer"],
                    ]}
                >
                    <Box
                        gridArea="upperHeader"
                        background="brand"
                        round="medium"
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

                    <Box background="light-2" gridArea="sidebar" round="small">
                        <LeftSideFilters />
                    </Box>
                    <Box
                        gridArea="main"
                        background="light-2"
                        justify="start"
                        round="small"
                    >
                        {isTableModeOn ? (
                            <ProductsTable />
                        ) : (
                            <div className="productsCase">
                                <Box
                                    gridArea="header"
                                    direction="row"
                                    background="light-2"
                                    round="small"
                                    align="center"
                                    alignContent="center"
                                    justify="center"
                                    hoverIndicator
                                >
                                    <NewProductForm />
                                </Box>
                                {paginatedData.products && (
                                    <Grid
                                        columns={{
                                            count: "fit",
                                            size: "medium",
                                        }}
                                        rows="small"
                                        gap="medium"
                                    >
                                        {paginatedData.products.map(
                                            (product: IProduct) =>
                                                !product.isDeleted && (
                                                    <ProductCard
                                                        key={product.id}
                                                        product={product}
                                                    />
                                                )
                                        )}
                                    </Grid>
                                )}
                            </div>
                        )}
                    </Box>
                    <Box background="brand" gridArea="footer" round="medium">
                        <Box align="center">
                            <Pagination
                                numberItems={filteredData.products.length}
                                page={page}
                                step={itemsPerPage}
                                onChange={(selectedPage: any) => {
                                    dispatch(setActualPage(selectedPage.page));
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};
