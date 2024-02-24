import { Box, CardFooter, Grid, Layer, Text } from "grommet";
import { IProduct } from "../../models/IProduct";
import { ProductImageCarousel } from "../../widgets/ProductImageCarousel";

export const ObjectPreviewCard = ({ product }: { product: IProduct }) => (
    <Layer
        position="center"
        margin={{ vertical: "small", start: "xlarge", end: "medium" }}
    >
        <Box
            pad={{ bottom: "25px" }}
            overflow="auto"
            style={{ borderRadius: "30px" }}
        >
            <Grid
                rows={["xsmall", "xxsmall", "xsmall", "xsmall", "xxsmall"]}
                columns={["medium", "medium"]}
                gap="small"
                areas={[
                    ["image", "title"],
                    ["image", "brand_category"],
                    ["image", "description"],
                    ["image", "description"],
                    ["rating", "price"],
                ]}
                key={product!.id}
                align="center"
                alignContent="center"
            >
                <Box
                    gridArea="image"
                    justify="center"
                    align="center"
                    margin="medium"
                    style={{ borderRadius: "30px", border: "1px solid black" }}
                >
                    <ProductImageCarousel
                        images={product!.images}
                        thumbnail={product!.thumbnail}
                        title={product!.title}
                        type={"card"}
                    />
                    <Box justify="center" align="center" pad="medium">
                        <Text textAlign="center">Stock: {product.stock}</Text>
                    </Box>
                </Box>
                <Box
                    gridArea="title"
                    justify="center"
                    align="center"
                    pad="medium"
                >
                    <Text weight="bold" textAlign="center">
                        {product.title}
                    </Text>
                </Box>
                <Box
                    gridArea="description"
                    justify="center"
                    align="center"
                    pad="small"
                    overflow="hidden"
                >
                    <Text textAlign="center">
                        Description: {product.description}
                    </Text>
                </Box>
                <Box
                    gridArea="brand_category"
                    justify="center"
                    align="center"
                    pad="xlamediumrge"
                >
                    <Text textAlign="center">Brand: {product.brand}</Text>
                    <Text textAlign="center">Category: {product.category}</Text>
                </Box>
                <Box
                    gridArea="rating"
                    justify="center"
                    align="center"
                    pad="medium"
                >
                    <CardFooter
                        justify="between"
                        pad={{
                            horizontal: "large",
                            vertical: "small",
                        }}
                        border
                        round="medium"
                    >
                        <Text size="small">{`Rating: ${product.rating}`}</Text>
                    </CardFooter>
                </Box>
                <Box
                    gridArea="price"
                    justify="center"
                    align="center"
                    pad="medium"
                >
                    <Text textAlign="end">{`Price: $${product.price.toFixed(2)}`}</Text>
                </Box>
            </Grid>
        </Box>
    </Layer>
);
