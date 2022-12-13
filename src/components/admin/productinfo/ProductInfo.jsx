import React from "react";
import ProductsService from "../../../services/ProductsService";
import ProductCard from "./productcard/ProductCard";
import style from "./productsinfo.module.css";
import axios from "axios";

const ProductInfo = () =>{

    const [productsAll, setProductsAll] = React.useState([]);

    React.useEffect(()=>{ 
        async function axiosProductsAll () {
            
                ProductsService.getProductsAll().then((response) => {
                    setProductsAll(response.data)
                    console.log(response.data) 
                 });
           
        }
        axiosProductsAll();
    }, []);



    const DeleteProduct = async (obj) =>{
        const del = await axios({
            method: 'DELETE',
            url: `http://localhost:8080/main/api/product/delete/${obj.id}`,
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY'),         
               }
        })
        console.log("Пробуем удалить продукт")
        setProductsAll(prev=> prev.filter(product => product.id !== obj.id));

    }


    return(
        <div className={style.products}>                                                    
                {
                    productsAll.map(product =>{
                    return(    
                       <ProductCard
                            key={product.id}                            
                            DeleteProduct={(obj) =>{
                                DeleteProduct(obj);
                            }}
                        {...product}
                       />
                    )                           
                    })
                }                    
        </div>
    );
}
export default ProductInfo;