import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Grid,
    Text,
    Box,
    StarRating,
    ResponsiveContext,
    Button,
    Drop,
} from "grommet";
import { IProduct } from "../../models/IProduct";
import { ProductImageCarousel } from "../../widgets/ProductImageCarousel";
import { Edit, Trash, View } from "grommet-icons";
import { useRef, useState } from "react";
import { CustomizeProductForm } from "../CustomizeProductForm";
import { useDispatch } from "react-redux";
import { useRemoveProductMutation } from "../../api/componentsApiSlice/productsApiSlice";
import { useAppSelector } from "../../stateManagement/hooks/redux";
import { setFilteredData } from "../../stateManagement/reducers/ProductsInfoSlice";
import { ObjectPreviewCard } from "../ObjectPreviewCard";

export const ProductCard = ({ product }: { product: IProduct }) => {
    const targetRef = useRef<any>();
    const dispatch = useDispatch();

    const [showDropContent, setShowDropContent] = useState(false);
    const [showPreviewCard, setShowPreviewCard] = useState(false);

    const [
        removeProduct,
        {
            data: removedData,
            isSuccess: removeSuccessFlag,
            isError: removeErrorFlag,
        },
    ] = useRemoveProductMutation();

    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );

    const handleRemoveObjectButton = (id: number) => {
        removeProduct({ id: id })
            .unwrap()
            .then((removedProduct: IProduct) => {
                const index = filteredData.products.findIndex(
                    (product: IProduct) => product.id === removedProduct.id
                );

                if (index !== -1) {
                    const updatedFilteredData = [...filteredData.products];
                    updatedFilteredData[index] = removedProduct;
                    dispatch(
                        setFilteredData({ products: updatedFilteredData })
                    );
                }
                setShowDropContent(false);
            })
            .catch((error) => {
                console.error("Error removing product:", error);
            });
    };

    const handleCustomizeOpenButtonClick = () => {
        setShowDropContent(!showDropContent);
    };

    const handleDropOpenButtonClick = () => {
        setShowPreviewCard(false);
        setShowDropContent(false);
    };

    const handlePreviewOpenButtonClick = () => {
        setShowPreviewCard(true);
        setShowDropContent(true);
    };

    return (
        <ResponsiveContext.Consumer>
            {(size) =>
                size === "small" ? (
                    <Box pad="xxsmal" gap="xxsmal" width="xlarge">
                        <Card
                            height="small"
                            width="xlarge"
                            background="light-1"
                        >
                            <CardBody pad="small">
                                <Grid
                                    rows={["xxsmall", "xxsmall", "xxsmall"]}
                                    columns={["fit"]}
                                    gap="small"
                                    areas={[
                                        ["image", "title"],
                                        ["image", "description"],
                                        ["image", "rating"],
                                    ]}
                                    key={product.id}
                                    align="center"
                                    alignContent="center"
                                >
                                    {/* Images carousel */}
                                    <Box
                                        gridArea="image"
                                        round="medium"
                                        justify="center"
                                        align="center"
                                    >
                                        <ProductImageCarousel
                                            images={product.images}
                                            thumbnail={product.thumbnail}
                                            title={product.title}
                                        />
                                    </Box>
                                    {/* End of carousel */}

                                    {/* Product title*/}
                                    <CardHeader
                                        gridArea="title"
                                        justify="between"
                                        pad={{
                                            horizontal: "medium",
                                            vertical: "small",
                                        }}

                                        height="40px"
                                        overflow="hidden"
                                        
                                    >
                                        <Text className="spanNoWrap" weight="bold">
                                            {product.title}
                                        </Text>
                                    </CardHeader>
                                    {/* End of title */}

                                    {/* Product description & rating  */}
                                    <Box
                                        gridArea="description"
                                        height="60px"
                                    >
                                        <Text
                                            truncate={true}
                                            margin={{ bottom: "small" }}
                                        >
                                            {product.description}
                                        </Text>
                                        <Text size="small">{`Rating: ${product.rating}`}</Text>
                                    </Box>
                                    {/* End of description & rating  */}

                                    {/* Product price */}
                                    <Box gridArea="rating">
                                        <CardFooter
                                            justify="between"
                                            pad={{
                                                horizontal: "medium",
                                                vertical: "xsmall",
                                            }}
                                            border
                                            round="medium"
                                        >
                                            <Text textAlign="end">{`Price: $${(product.price - product.price * (product.discountPercentage / 100)).toFixed(2)}`}</Text>
                                        </CardFooter>
                                    </Box>
                                    {/* End of price */}
                                </Grid>
                            </CardBody>
                        </Card>
                    </Box>
                ) : (
                    <Box pad="xxsmal" gap="xxsmal" width="xlarge">
                        <Card
                            height="small"
                            width="xlarge"
                            background="light-1"
                        >
                            <CardBody pad="small">
                                <Grid
                                    rows={["xxsmall", "xxsmall", "xxsmall"]}
                                    columns={["small", "medium", "xsmall"]}
                                    gap="small"
                                    areas={[
                                        ["image", "title", "priceComp"],
                                        ["image", "description", "priceComp"],
                                        ["image", "rating", "priceComp"],
                                    ]}
                                    key={product.id}
                                    align="center"
                                    alignContent="center"
                                >
                                    {/* Images carousel */}
                                    <Box
                                        gridArea="image"
                                        round="medium"
                                        justify="center"
                                        align="center"
                                    >
                                        <ProductImageCarousel
                                            images={product.images}
                                            thumbnail={product.thumbnail}
                                            title={product.title}
                                        />
                                    </Box>
                                    {/* End of carousel */}

                                    {/* Product title */}
                                    <CardHeader
                                        gridArea="title"
                                        justify="between"
                                        pad={{
                                            horizontal: "medium",
                                            vertical: "small",
                                        }}
                                    >
                                        <Text weight="bold">
                                            {product.title}
                                        </Text>
                                    </CardHeader>
                                    {/* End of title */}

                                    {/* Product description */}
                                    <Box gridArea="description" height="xxsmall" overflow="hidden">
                                        <Text margin={{ bottom: "xsmall" }}>
                                            {product.description}
                                        </Text>
                                    </Box>
                                    {/* End of description */}

                                    {/* Product rating */}
                                    <Box gridArea="rating">
                                        <CardFooter
                                            justify="between"
                                            pad={{
                                                horizontal: "large",
                                                vertical: "xsmall",
                                            }}
                                            border
                                            round="medium"
                                        >
                                            <StarRating
                                                value={product.rating}
                                                name="Raing"
                                                width="xxsmall"
                                            />
                                            <Text size="small">{`Rating: ${product.rating}`}</Text>
                                        </CardFooter>
                                    </Box>
                                    {/* End of rating */}

                                    {/* Product price */}
                                    <Box gridArea="priceComp" align="end">
                                        <Box align="start" justify="end">
                                            <Box
                                                align="center"
                                                justify="start"
                                                ref={targetRef}
                                                margin={{
                                                    bottom:"large"
                                                }}
                                            >
                                                <Button
                                                    icon={<Edit />}
                                                    hoverIndicator
                                                    color="brand"
                                                    onClick={() => {
                                                        handleCustomizeOpenButtonClick();
                                                    }}
                                                />
                                            </Box>
                                            {showDropContent && (
                                                <>
                                                    <Drop
                                                        align={{
                                                            top: "bottom",
                                                            right: "right",
                                                        }}
                                                        target={
                                                            targetRef.current
                                                        }
                                                        elevation="large"
                                                        round="small"
                                                        margin={{
                                                            bottom: "small",
                                                        }}
                                                        onClickOutside={() => {
                                                            handleDropOpenButtonClick()
                                                        }}
                                                    >
                                                        <Box
                                                            align="center"
                                                            justify="center"
                                                            pad="small"
                                                        >
                                                            <Box
                                                                pad="xxsmall"
                                                                width="165px"
                                                            >
                                                                <Button
                                                                    icon={
                                                                        <View
                                                                            color="dark-2"
                                                                            size="medium"
                                                                        />
                                                                    }
                                                                    label="Preview"
                                                                    onClick={() => {
                                                                        handlePreviewOpenButtonClick();
                                                                    }}
                                                                />
                                                            </Box>
                                                            <CustomizeProductForm
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                            {showPreviewCard && (
                                                                <ObjectPreviewCard
                                                                    product={
                                                                        product
                                                                    }
                                                                />
                                                            )}
                                                            <Box
                                                                pad="xxsmall"
                                                                width="165px"
                                                            >
                                                                <Button
                                                                    icon={
                                                                        <Trash
                                                                            color="dark-2"
                                                                            size="medium"
                                                                        />
                                                                    }
                                                                    label="Remove"
                                                                    onClick={() => {
                                                                        handleRemoveObjectButton(
                                                                            product
                                                                                .id
                                                                        );
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Drop>
                                                </>
                                            )}
                                        </Box>
                                        <Box>
                                            <Text textAlign="end">{`Price: $${product.price.toFixed(2)}`}</Text>
                                        </Box>
                                    </Box>
                                    {/* End of price */}
                                </Grid>
                            </CardBody>
                        </Card>
                    </Box>
                )
            }
        </ResponsiveContext.Consumer>
    );
};
