import { AppContext } from "../../../App";
import ProviderCard from "../providercard/ProviderCard"
import ProviderProducts from "./ProviderProducts";
import style from './infoaboutprovider.module.css';
import React from "react";



const InfoAboutProvider = () =>{

    const context = React.useContext(AppContext);

    const [searchAdmin, setSearchAdmin] = React.useState([]);
    const [searchAdminPrice, setSearchAdminPrice] = React.useState([]); 
    const [searchAdminCategory, setSearchAdminCategory] = React.useState([]);   
    const [searchAdminDescription, setSearchAdminDescription] = React.useState([]);

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

    return(
        <div className={style.container_info}>
            <div>
              <ProviderCard
                key={context.infoProvider.id}
                login={context.infoProvider.login}
                email={context.infoProvider.email}
                phone={context.infoProvider.phone}
                id={context.infoProvider.id}
                fileName={context.infoProvider.fileName}
                avatar={context.infoProvider.url}
            /> 
            </div>
            <div>
              <ProviderProducts
                login={context.infoProvider.login}
                searchAdmin={searchAdmin}
                searchAdminPrice={searchAdminPrice}
                searchAdminDescription={searchAdminDescription}
                searchAdminCategory={searchAdminCategory} 
              />  
            </div>
            <div className={style.search_name_product}>
               <input type="text" onChange={onSearchInput} placeholder="Поиск по наименованию товара: " />
               <input type="text" onChange={onSearchInputDescription} placeholder="Поиск по описанию товара: " />
               <input type="text" onChange={onSearchInputPrice} placeholder="Поиск по цене товара: " />
               <input type="text" onChange={onSearchInputCategory} placeholder="Поиск по категории товара: " />
            </div>
           
        </div>
    )
}

export default InfoAboutProvider