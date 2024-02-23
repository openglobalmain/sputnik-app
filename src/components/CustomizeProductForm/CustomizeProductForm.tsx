import { useEffect, useState } from "react";

import { Close, Edit } from "grommet-icons";

import {
    Box,
    Button,
    Form,
    FormField,
    Heading,
    Layer,
    Select,
    TextInput,
} from "grommet";
import { IProduct } from "../../models/IProduct";
import {
    useGetAllCategoryQuery,
    useUpdateProductMutation,
} from "../../api/componentsApiSlice/productsApiSlice";
import { useDispatch } from "react-redux";
import {
    setFilteredData,
    setUpdatedCustomizeObject,
} from "../../stateManagement/reducers/ProductsInfoSlice";
import { useAppSelector } from "../../stateManagement/hooks/redux";

export const CustomizeProductForm = ({ product }: { product: IProduct }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(product.title);
    const [description, setDescription] = useState<string>(product.description);
    const [price, setPrice] = useState<string>(product.price.toString());
    const [discountPercentage, setDiscountPercentage] = useState<string>(
        product.discountPercentage.toString()
    );
    const [rating, setRating] = useState<string>(product.rating.toString());
    const [stock, setStock] = useState<string>(product.stock.toString());
    const [brand, setBrand] = useState<string>(product.brand);
    const [category, setCategory] = useState<string>(product.category);

    const updatedObject = useAppSelector(
        (state) => state.products.updatedObject
    );
    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );

    const { data: categoriesData } = useGetAllCategoryQuery({});

    const [
        updateProduct,
        {
            data: updatedData,
            isSuccess: updateSuccessFlag,
            isError: updateErrorFlag,
        },
    ] = useUpdateProductMutation();

    const localObject: () => IProduct = () => {
        return {
            id: product.id,
            title,
            description,
            price: parseFloat(price || "0"),
            discountPercentage: parseFloat(discountPercentage || "0"),
            rating: parseFloat(rating || "0"),
            stock: parseFloat(stock || "0"),
            brand,
            category,
            thumbnail: product.thumbnail,
            images: product.images,
        };
    };

    const handleCustomizeObjectButtonClick = () => {
        try {
            const updatedData = {
                products: [...filteredData.products],
            };

            const index = updatedData.products.findIndex(
                (localProduct: IProduct) => localProduct.id === product.id
            );

            if (index !== -1) {
                updatedData.products[index] = updatedObject;
                dispatch(setFilteredData(updatedData));
            }
            updateProduct({ id: product.id, data: updatedObject })
                .unwrap()
                .then((updatedProduct) => {
                    console.log("Update product successful");
                    console.log(updatedData);
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } catch (error) {
            console.error("Error in update product:", error);
        }
    };

    useEffect(() => {
        dispatch(setUpdatedCustomizeObject(localObject()));
    }, [
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
    ]);

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(false);

    return (
        <Box fill align="center" justify="center" pad="xxsmall" width="165px">
            <Button icon={<Edit />} label="Customize" onClick={onOpen} />
            {open && (
                <Layer
                    position="right"
                    full="vertical"
                    modal
                    onClickOutside={onClose}
                    onEsc={onClose}
                >
                    <Box
                        fill="vertical"
                        overflow="auto"
                        width="medium"
                        pad="medium"
                    >
                        <Form
                            validate="blur"
                            onSubmit={handleCustomizeObjectButtonClick}
                            onChange={(event: any) => {
                                setPrice(event.price);
                                setBrand(event.brand);
                                setCategory(event.category);
                                setDescription(event.description);
                                setDiscountPercentage(event.discountPercentage);
                                setRating(event.rating);
                                setStock(event.stock);
                                setTitle(event.title);
                            }}
                        >
                            <Box flex={false} direction="row" justify="between">
                                <Heading level={2} margin="none">
                                    Customize
                                </Heading>
                                <Button icon={<Close />} onClick={onClose} />
                            </Box>

                            <FormField label="title" name="title" required>
                                <TextInput
                                    name="title"
                                    aria-label="title"
                                    type="title"
                                    value={title}
                                />
                            </FormField>

                            <FormField
                                label="description"
                                name="description"
                                required
                            >
                                <TextInput
                                    name="description"
                                    aria-label="description"
                                    type="description"
                                    value={description}
                                />
                            </FormField>

                            <FormField label="brand" name="brand" required>
                                <TextInput
                                    name="brand"
                                    aria-label="brand"
                                    type="brand"
                                    value={brand}
                                />
                            </FormField>

                            {categoriesData && (
                                <FormField
                                    label="category"
                                    name="category"
                                    htmlFor="category"
                                    required
                                >
                                    <Select
                                        name="category"
                                        id="category"
                                        options={categoriesData}
                                        value={category}
                                    />
                                </FormField>
                            )}

                            <FormField
                                label="discountPercentage"
                                name="discountPercentage"
                                required
                            >
                                <TextInput
                                    name="discountPercentage"
                                    aria-label="discountPercentage"
                                    type="text"
                                    value={discountPercentage}
                                />
                            </FormField>

                            <FormField label="rating" name="rating" required>
                                <TextInput
                                    name="rating"
                                    aria-label="rating"
                                    type="text"
                                    value={rating}
                                />
                            </FormField>

                            <FormField label="stock" name="stock" required>
                                <TextInput
                                    name="stock"
                                    aria-label="stock"
                                    type="text"
                                    value={stock}
                                />
                            </FormField>

                            <FormField label="price $" name="price" required>
                                <TextInput
                                    name="price"
                                    aria-label="price"
                                    type="text"
                                    value={price}
                                />
                            </FormField>

                            <Box flex={false} as="footer" align="start">
                                <Button type="submit" label="Submit" primary />
                            </Box>
                        </Form>
                    </Box>
                </Layer>
            )}
        </Box>
    );
};
