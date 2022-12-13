import React from "react";
import ProductsService from "../../../services/ProductsService";
import ProductCard from "../../admin/productinfo/productcard/ProductCard";
import style from "./productinfo.module.css";
import axios from "axios";
import ProvidersService from "../../../services/ProvidersService";

const ProductInfo = () =>{

    const [productsAll, setProductsAll] = React.useState([]);
    const [searchAdmin, setSearchAdmin] = React.useState([]);
    const [searchAdminPrice, setSearchAdminPrice] = React.useState([]); 
    const [searchAdminCategory, setSearchAdminCategory] = React.useState([]);   
    const [searchAdminDescription, setSearchAdminDescription] = React.useState([]);

    React.useEffect(()=>{
 
        async function axiosProductsAll () {
                if(localStorage.getItem('ID')){
                ProductsService.getProductsAllProvider().then((response) => {
                    setProductsAll(response.data)
                    console.log(response.data) 
                 });                    
                }

           
        }
        axiosProductsAll();
    }, []);



    const onSearchInput = (inputValue) => {
        setSearchAdmin(inputValue.target.value)
    }
    const onSearchInputPrice = (inputValue) => {
        setSearchAdminPrice(inputValue.target.value)
    }
    const onSearchInputDescription = (inputValue) => {
        setSearchAdminDescription(inputValue.target.value)
    }
    const onSearchInputCategory = (inputValue) => {
        setSearchAdminCategory(inputValue.target.value)
    }  



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
        let name = searchAdmin;
        let price = searchAdminPrice;
        let description = searchAdminDescription;
        let category = searchAdminCategory;

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
        product.name.toLowerCase().includes(name)
        ).filter((product) => 
        product.price.toString().toLowerCase().includes(price))
        .filter((product) => 
        product.description.toLowerCase().includes(description))
        .filter((product) => 
        product.nameCategory.toLowerCase().includes(category));

        
        return(filterItem).map((product, index) => {
            return(
              <ProductCard
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
        <div className={style.provider}>          
            <div className={style.products}>                                                    
                    {
                        renderCard()
                    }                                    
            </div>
            <div className={style.search_name_product}>
               <input type="text" onChange={onSearchInput} placeholder="Поиск по наименованию товара: " />
               <input type="text" onChange={onSearchInputDescription} placeholder="Поиск по описанию товара: " />
               <input type="text" onChange={onSearchInputPrice} placeholder="Поиск по цене товара: " />
               <input type="text" onChange={onSearchInputCategory} placeholder="Поиск по категории товара: " />
            </div>              
        </div>
    );
}
export default ProductInfo;