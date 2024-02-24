import { Box, Carousel, Image, ResponsiveContext } from "grommet";

export const ProductImageCarousel = ({
    images,
    thumbnail,
    title,
    type,
}: {
    images: string[];
    thumbnail: string;
    title: string;
    type?: string;
}) => {
    return (
        <ResponsiveContext.Consumer>
            {(size) =>
                size === "small" ? (
                    <Box
                        margin={{
                            left: "10px",
                            right: "10px",
                        }}
                        pad="large"
                        style={{
                            width: "180px",
                            height: "180px",
                        }}
                    >
                        <Image
                            src={thumbnail}
                            alt={title}
                            style={{
                                width: "140px",
                            }}
                            alignSelf="center"
                            fit="cover"
                            fallback={require("../../assets/images/img_not_found.png")}
                        />
                    </Box>
                ) : (
                    <Carousel alignSelf="center">
                        {thumbnail && (
                            <Box
                                pad="large"
                                style={{
                                    width: type === "card" ? "240px" : "180px",
                                    height: type === "card" ? "240px" : "200px",
                                }}
                            >
                                <Image
                                    src={thumbnail}
                                    alt={title}
                                    style={{
                                        width:
                                            type === "card" ? "300px" : "140px",
                                    }}
                                    alignSelf="center"
                                    fit="contain"
                                    fallback={require("../../assets/images/img_not_found.png")}
                                />
                            </Box>
                        )}
                        {images.map((image, index) => (
                            <Box
                                key={index}
                                pad="large"
                                style={{
                                    width: type === "card" ? "240px" : "180px",
                                    height: type === "card" ? "240px" : "200px",
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={title}
                                    style={{
                                        width: type ? "220px" : "140px",
                                    }}
                                    alignSelf="center"
                                    fit="cover"
                                    fallback={require("../../assets/images/img_not_found.png")}
                                />
                            </Box>
                        ))}
                    </Carousel>
                )
            }
        </ResponsiveContext.Consumer>
    );
};
