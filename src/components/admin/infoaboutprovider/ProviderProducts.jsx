import React from "react";
import ProductsService from "../../../services/ProductsService";
import ProviderProductCard from "./providerproductcard/ProviderProductCard";
import style from "./providerproducts.module.css";
import axios from "axios";


const ProviderProducts = (props) =>{

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

    const renderCard = () =>{
        let name = props.searchAdmin;
        let price = props.searchAdminPrice;
        let description = props.searchAdminDescription;
        let category = props.searchAdminCategory;

        if(name.toString()) {
            name = name.toString().toLowerCase();
        }
        if(price.toString()) {
            price = price.toString().toLowerCase();
        }
        if(description.toString()) {
            description = description.toString().toLowerCase();
        }
        if(category.toString()) {
            category = category.toString().toLowerCase();
        }                

        const filterItem = productsAll.filter((product) =>
        product.providerName.includes(props.login)
        ).filter((product) => 
        product.name.toLowerCase().includes(name)
        ).filter((product) => 
        product.price.toString().toLowerCase().includes(price))
        .filter((product) => 
        product.description.toLowerCase().includes(description))
        .filter((product) => 
        product.nameCategory.toLowerCase().includes(category));

        
        return(filterItem).map((product, index) => {
            return(
              <ProviderProductCard
                key={index}                            
                DeleteProduct={(obj) =>{
                  DeleteProduct(obj);
                }}
                {...product}
                />                
            )
        })       
    }


    return(
        <div className={style.products}>                                                    
                {
                   renderCard()
                }                    
        </div>
    );
}
export default ProviderProducts;