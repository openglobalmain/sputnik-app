import { useState } from "react";
import { AddCircle, Close } from "grommet-icons";
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
    useAddProductMutation,
    useGetAllCategoryQuery,
} from "../../api/componentsApiSlice/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilteredData } from "../../stateManagement/reducers/ProductsInfoSlice";
import { useAppSelector } from "../../stateManagement/hooks/redux";
import { exampleData } from "../../assets/dataExamples/exampleOfData";

export const NewProductForm = () => {
    const dispatch = useDispatch();

    const filteredData = useAppSelector(
        (state) => state.products.filteredObjectData
    );

    const product = filteredData.products[0]
        ? filteredData.products[0]
        : exampleData.products[0];
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

    const { data: categoriesData } = useGetAllCategoryQuery({});

    const [
        addProduct,
        { data: addData, isSuccess: addSuccessFlag, isError: addErrorFlag },
    ] = useAddProductMutation();

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(false);

    const newLocalObject: () => IProduct = () => {
        return {
            id: filteredData.products.length + 1,
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

    const handleAddObjectButtonClick = () => {
        try {
            const updatedData = {
                products: [...filteredData.products, newLocalObject()],
            };
            dispatch(setFilteredData(updatedData));

            addProduct({ id: product.id, data: newLocalObject() })
                .unwrap()
                .then((updatedProduct: any) => {
                    console.log("Added product successful");
                })
                .catch((error: any) => {
                    console.error("Error adding product:", error);
                });
        } catch (error) {
            console.error("Error in adding product:", error);
        }
    };

    return (
        <Box fill align="center" justify="center" pad="small" width="165px">
            <Button
                icon={<AddCircle />}
                label="Add new product"
                onClick={onOpen}
            />
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
                            onSubmit={handleAddObjectButtonClick}
                            onChange={(event: any) => {
                                setPrice(event.price);
                                setBrand(event.brand);
                                setCategory(event.category);
                                setDescription(event.description);
                                setDiscountPercentage(event.discountPercentage);
                                setRating(event.rating);
                                setStock(event.stock);
                                setTitle(event.title);
                                newLocalObject();
                            }}
                        >
                            <Box flex={false} direction="row" justify="between">
                                <Heading level={2} margin="none">
                                    Add new product
                                </Heading>
                                <Button icon={<Close />} onClick={onClose} />
                            </Box>

                            <FormField label="title" name="title" required>
                                <TextInput
                                    name="title"
                                    aria-label="title"
                                    type="text"
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
                                    type="text"
                                    value={description}
                                />
                            </FormField>

                            <FormField label="brand" name="brand" required>
                                <TextInput
                                    name="brand"
                                    aria-label="brand"
                                    type="text"
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
