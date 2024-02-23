import { useState } from "react";
import { Box, DataTable, ResponsiveContext } from "grommet";
import { useAppSelector } from "../../../stateManagement/hooks/redux";

const columns = [
    { property: "brand", header: "Brand" },
    { property: "id", header: "ID", primary: true },
    { property: "title", header: "Title" },
    { property: "price", header: "Price" },
    { property: "discountPercentage", header: "Discount(%)" },
    { property: "rating", header: "Rating" },
    { property: "stock", header: "Stock" },
    { property: "category", header: "Category" },
];

export const ProductsTable = () => {
    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );
    const paginatedData = useAppSelector(
        (state) => state.products.paginatedData
    );

    const [expandedGroups, setExpandedGroups] = useState([
        filteredData.products[0].category,
    ]);

    return (
        <ResponsiveContext.Consumer>
            {(size: string) =>
                size === "small" ? (
                    <Box 
                    overflow="auto"
                    width="100%"
                    background={"light-2"}>
                        <DataTable
                            columns={columns}
                            data={filteredData.products}
                            groupBy={{
                                property: "brand",
                                expand: expandedGroups,
                                onExpand: setExpandedGroups,
                            }}
                            sortable
                        />
                    </Box>
                ) : (
                    <Box overflow="hidden">
                        <DataTable
                            columns={columns}
                            data={filteredData.products}
                            groupBy={{
                                property: "brand",
                                expand: expandedGroups,
                                onExpand: setExpandedGroups,
                            }}
                            sortable
                        />
                    </Box>
                )
            }
        </ResponsiveContext.Consumer>
    );
};
