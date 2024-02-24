import {
    Grommet as GrommetIcon,
    FacebookOption,
    Instagram,
    Twitch,
} from "grommet-icons";

import { Anchor, Box, Footer, Text } from "grommet";

const Media = () => (
    <Box direction="row" gap="xxsmall" justify="center">
        <Anchor
            a11yTitle="Share feedback on Github"
            href="https://www.instagram.com/"
            icon={<Instagram color="brand" />}
        />
        <Anchor
            a11yTitle="Chat with us on Slack"
            href="https://www.facebook.com/"
            icon={<FacebookOption color="brand" />}
        />
        <Anchor
            a11yTitle="Follow us on Twitter"
            href="https://twitter.com/"
            icon={<Twitch color="brand" />}
        />
    </Box>
);

export const MainFooter = () => (
    <Box>
        <Footer background="light-3" pad="small">
            <Box align="center" direction="row" gap="xsmall">
                <GrommetIcon color="brand" size="medium" />
                <Text alignSelf="center" color="brand" size="small">
                    Danil Ivanov
                </Text>
            </Box>
            <Media />
            <Text textAlign="center" size="xsmall">
                ©Copyright
            </Text>
        </Footer>
    </Box>
);
