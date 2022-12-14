import React from 'react';
import { AppContext } from "../../App";
import Users from "../users/Users";
import AddUser from '../users/AddUser';
import EditUser from '../users/editUser/EditUser';
import ProductInfo from './productinfo/ProductInfo';
import ProductAdd from './productinfo/productadd/ProductAdd';
import style from './admin.module.css';
import ProviderInfo from './providerinfo/ProviderInfo';
import ProviderAdd from './providercard/provideradd/ProviderAdd';
import InfoAboutProvider from './infoaboutprovider/InfoAboutProvider';
import AllOrders from './orders/AllOrders';
import EditProvider from './providercard/editProviders/EditProvider';
import EditProductAdmin from './editproductadmin/EditProductAdmin';




const PanelAdmin = (props) => {

  const context = React.useContext(AppContext);
  const [change, setChange] = React.useState(false);

  const setButtonAllProviders=()=>{
    if(context.isAllProviders) {
      context.setAllProviders(false);
      context.setIsInfoProvider(false);
      context.setInfoProvider([]);
    } else {
      context.setAllProviders(true);
    }
    
  } 
  
  const setButtonAddProvider=()=>{
    if(context.isAddProvider) {
      context.setAddProvider(false);
    } else {
      context.setAddProvider(true);
    }
  } 

  const setButtonAllProducts=()=>{
    if(context.isAllProducts) {
      context.setAllProducts(false);
    } else {
      context.setAllProducts(true);
    }
  }

  const setButtonAllUsers=()=>{    
    if(context.isAllUsers) {
      context.setAllUsers(false);
    } else {
      context.setAllUsers(true);
    }    
  }
  
  const setButtonAddUser=()=>{
    
    if (context.isAddUser) {
      context.setDataForm([]);
      context.setImage([]);
      context.setImageUrl([]);
      context.setIsImageUrl(false);
    } 
    context.setAddUser(!context.isAddUser);    
  }  

  const setButtonAddProduct=()=>{
    
    if (context.isAddProduct) {
      context.setDataFormProduct([]);
      context.setImageProduct([]);
      context.setImageProductUrl([]);
      context.setIsImageProductUrl(false);
    } 
    context.setAddProduct(!context.isAddProduct);    
  }
   

    return(
        <div>
        {context.isUsersBtn ?
          <div className={style.button_user_row}>
            <span></span>  
            <span className={style.first_btn}>
                 
                <button className={context.isAllUsers ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAllUsers()}>All Users</button> 
            </span>
            <span className={style.second_btn}>
                <button className={context.isAddUser ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAddUser()}>Add User</button>
            </span>
            <span></span>
          </div>
        :
        <></>  
        }
        {context.isProductsBtn ? 
          <div className={style.button_product_row}>
            <span></span> 
            <span className={style.first_btn}>
              <button className={context.isAllProduct ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAllProducts()}>All Product</button> 
            </span>
            <span className={style.second_btn}>
                <button className={context.isAddProduct ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAddProduct()}>Add Product</button> 
            </span>        
            <span>
            </span>   
          </div>
        :
        <></>  
        }
        {context.isProvidersBtn ? 
          <div className={style.button_product_row}>
            <span></span> 
            <span className={style.first_btn}>
              <button className={context.isAllProviders ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAllProviders()}>All Providers</button> 
            </span>
            <span className={style.second_btn}>
                <button className={context.isAddProvider ? style.function_btn_on : style.function_btn} onClick={() =>setButtonAddProvider()}>Add Provider</button> 
            </span>        
            <span>
            </span>   
          </div>
        :
        <></>  
        }  
          {context.isOrdersBtn 
          ?
          <AllOrders />
          :
          <></>
          }      
          {context.isAddUser
          ?
            <AddUser />
          :
            <></>  
          }                                        
          {context.isAllUsers 
          ?
              context.isEdit ? <EditUser /> : <Users />          
          :          
           <></>          
          }
          {context.isAllProviders
          ?
           <>
              {context.isEditProvider ? <EditProvider/> : <></>}
              {context.isInfoProvider ? <InfoAboutProvider/> :<ProviderInfo/>} 
           </>
           
          :
            <></>
          }
          {context.isAddProvider? <ProviderAdd /> : <></>}
          {context.isAllProducts ?
            context.isEditProduct ? <EditProductAdmin/>: <ProductInfo setChange={setChange} change={change}/>
            :
            <></>
            }
          {context.isAddProduct ? <ProductAdd /> : <></>}
        
      </div>  
    );
}

export default PanelAdmin