import { AppContext } from "../../../App";
import React from "react";
import ProductInfo from "../productinfo/ProductInfo";
import ProductAdd from "../provideraddproduct/ProductAdd";
import EditProduct from "../editproduct/EditProduct";


const PanelProvider = () =>{

    const context = React.useContext(AppContext);

    return(
        <>
        {context.isProviderAllProductsBtn ? <>{context.isEditProduct ? <EditProduct/>: <ProductInfo />}</> : <></>}
        {context.isProviderAddProductsBtn ? <ProductAdd /> : <></>}
        </>
    )
}
export default PanelProvider