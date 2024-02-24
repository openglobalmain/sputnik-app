import { ProductsCardsList } from "../../components/ProductsCardsList";
import { MainFooter } from "../../widgets/Footer/MainFooter";
import { MainHeader } from "../../widgets/Header";

export const MainPage = () => {
    return (
        <div className="body">
            {/* Header */}
            <div className="main-header">
                <MainHeader />
            </div>
            {/* End header */}
            <main className="mainClassForMain">
                <div className="main-div">
                    <ProductsCardsList />
                </div>
            </main>
            {/* Footer */}
            <div
                className="main-footer"
                style={{ bottom: 0, left: 0, width: "100%" }}
            >
                <MainFooter />
            </div>
            {/* End footer */}
        </div>
    );
};
