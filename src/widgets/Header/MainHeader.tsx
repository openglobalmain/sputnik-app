import { Anchor, Box, Header, Menu, ResponsiveContext } from "grommet";
import { Grommet as GrommetIcon, Menu as MenuIcon } from "grommet-icons";

export const MainHeader = () => {
    return (
        <Header background="light-3" pad="medium" height="xsmall">
            <Box justify="start" direction="row" gap="medium">
                <Anchor
                    href="https://tools.grommet.io/"
                    icon={<GrommetIcon color="brand" />}
                    label="Sputnik test app"
                />
            </Box>
            <ResponsiveContext.Consumer>
                {(size) =>
                    size === "small" ? (
                        <Box justify="end">
                            <Menu
                                a11yTitle="Navigation Menu"
                                dropProps={{
                                    align: { top: "bottom", right: "right" },
                                }}
                                icon={<MenuIcon color="brand" />}
                                items={[
                                    {
                                        label: (
                                            <Box pad="small">
                                                Telegram feedback
                                            </Box>
                                        ),
                                        href: "https://t.me/daln1st",
                                    },
                                    {
                                        label: (
                                            <Box pad="small">
                                                Git repository
                                            </Box>
                                        ),
                                        href: "https://github.com/grommet/grommet/issues",
                                    },
                                ]}
                            />
                        </Box>
                    ) : (
                        <Box justify="end" direction="row" gap="medium">
                            <img
                                className="logoImg"
                                src={require("../../assets/icons/telegramIcon.png")}
                                alt={"telegramIcon"}
                            />
                            <Anchor
                                href="https://t.me/daln1st"
                                label="Telegram feedback"
                            />
                        </Box>
                    )
                }
            </ResponsiveContext.Consumer>
        </Header>
    );
};
