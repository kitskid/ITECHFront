import React from 'react';
import About from "./about/About"
import Banner from "./banner/Banner"
import Products from "./products/Products"
import { AppContext } from "../App";
import PanelAdmin from "./admin/PanelAdmin";
import PanelProvider from './provider/panelprovider/PanelProvider';
import Cart from './cart/Cart';
import Account from './account/Account';
import Categories from './categories/Categories';
import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import Info from './info/Info';


const Home = (props) => {
     
    const context = React.useContext(AppContext);
    const [category, setCategory] = React.useState([]);
    const [choosCategoryName, setChoosCategoryName] = React.useState();
    const [change, setChange] = React.useState(false);

    React.useEffect((props)=>{    
        async function axiosCategories (props) {
        await axios({
          method:'GET',
          url:'http://localhost:8080/main/api/product/category/all',
          headers:{
                  'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
          }
        }).then((response) =>{
          console.log(response.data);    
          setCategory(response.data);               
        });
 
        }

      axiosCategories(props);

      }, []);

     
    const chooseCategory = (chooseCategory) => {
            setChoosCategoryName(chooseCategory); 
    }

    return(
        <> 
        {localStorage.getItem('USER_ROLE') === 'ADMIN' 
        ? 
            <PanelAdmin /> 
        : 
        <>
        {localStorage.getItem('USER_ROLE') === 'PROVIDER' 
        ?
            <PanelProvider/>
        :
        <>
        {context.cartOpened ?        
            <Cart
             closeCart={props.closeCart}
             cartItems={props.cartItems}
             cartRemoveItem={props.cartRemoveItem}
             totalPrice={props.totalPrice}
            /> :
            null
        } 
        {context.accountOpened ? 
            <Account
                closeAccount={props.closeAccount} 
                accountItems={props.accountItems}
                totalPrice={props.totalPrice}
            /> :
            null
        }     
            <Banner />            
            <About />
            <Categories 
                chooseCategory={chooseCategory}
                category={category}
                setCategory={setCategory}
            />
            {context.isInfo ? 
                <Info/>
                :
                null    
            }
            <Products 
                items={props.items}
                cartItems={props.cartItems}
                favorites={props.favorites}
                setCartItems={props.setCartItems}
                setFavorites={props.setFavorites}
                setSearch={props.setSearch}
                search={props.search}
                loading={props.loading}
                nameCategory={choosCategoryName}
                setSearch2={props.setSearch2}
                setSearch3={props.setSearch3}
                setSearch4={props.setSearch4}
                search2={props.search2}
                search3={props.search3}
                search4={props.search4}
                setChange={setChange}
                change={change}
            />             
        </>
        }
        </>    
        }         
        </>
    )
}

export default Home