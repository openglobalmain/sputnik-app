import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grommet } from "grommet";
import { store } from "./stateManagement/store";
import App from "./app/AppComp/App";

const root = createRoot(document.getElementById("root") as HTMLElement);

const theme = {
    name: "default",
    rounding: 4,
    spacing: 24,
    global: {
        font: {
            family: "'Roboto'",
        },
    },
};

root.render(
    <StrictMode>
        <Grommet theme={theme} style={{height:"100%"}}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </Grommet>
    </StrictMode>
);
