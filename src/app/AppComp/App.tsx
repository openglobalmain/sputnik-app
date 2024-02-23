import { MainPage } from "../../pages/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route index path="/*" element={<MainPage />} />
        </Routes>
    );
}

export default App;
