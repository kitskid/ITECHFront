import style from './header.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
import { AppContext } from "../../App";

const Header =(props) =>{

  const context = React.useContext(AppContext);
  

  const logOut=()=>{
    localStorage.clear(); 
    context.setAuthUser(false);
    context.setRole('');
    context.setAllUsers(false);
    context.setAllUsers(false);
    context.setAddUser(false);
    context.setDataForm([]);
    context.setErrorServer([]);
    context.setIsImageUrl(false); 
    context.setImage([]);
    context.setImageUrl([]); 
    context.setEdit(false);
    context.setEditUser([]);       
  }

  const setButtonProducts=()=>{
    if(context.isProductsBtn) {
      context.setProductsBtn(false);
    } else {
      context.setProductsBtn(true);
    }
    
    
  }

  const setButtonUsers=()=>{
    if(context.isUsersBtn) {
      context.setUsersBtn(false);
    } else {
      context.setUsersBtn(true);
    } 
    if (context.isAddUser) {
      context.setDataForm([]);
      context.setImage([]);
      context.setImageUrl([]);
      context.setIsImageUrl(false);
    } 
    context.setAddUser(false); 
    context.setAllUsers(false);  
  }
  
  const setButtonProviders=()=>{
    if(context.isProvidersBtn) {
      context.setProvidersBtn(false);
    } else {
      context.setProvidersBtn(true);
    }
  }
  const setButtonAllProducts=()=>{
    if(context.isProviderAllProductsBtn){
      context.setIsProviderAllProductsBtn(false);
    } else {
      context.setIsProviderAllProductsBtn(true);
    }
  }
  const setButtonAddProducts=()=>{
    if(context.isProviderAddProductsBtn){
      context.setIsProviderAddProductsBtn(false);
    } else {
      context.setIsProviderAddProductsBtn(true);
    }
  }
  
  const setButtonCart=()=>{
    if(context.isCartBtn){
      context.setIsCartBtn(false);
    } else{
      context.setIsCartBtn(true);
    }
  }
  const setButtonAccount=()=>{
    if(context.isAccountBtn){
      context.setIsAccountBtn(false);
    } else{
      context.setIsAccountBtn(true);
    }
  }
  const setButtonOrders =()=>{
    if(context.isOrdersBtn){
      context.setIsOrdersBtn(false);
    } else {
      context.setIsOrdersBtn(true);
    }
  }



    return(
        <div>
        <header> 
          {(localStorage.getItem('USER_ROLE') === 'ADMIN') || (localStorage.getItem('USER_ROLE') === 'PROVIDER')
          ? 
            <h1 className={style.logo}>ITECH</h1>
          :
           <Link to='/'>
           <h1 className={style.logo}>ITECH</h1>
           </Link> 
          }         
          
          {(localStorage.getItem('USER_ROLE') === 'ADMIN') || (localStorage.getItem('USER_ROLE') === 'PROVIDER')
          ?
            <span></span>
          :
           <nav>
              {/*<Link to='/favorites'>
               <button className={style.nav_item}>ИЗБРАННОЕ</button>
              </Link>*/}    
              <div className={style.cart_link}>
               {/* <button className={style.nav_item} onClick={props.openCart} >КОРЗИНА</button>
                <span className={style.cartItems_count}>{props.cartItems.length}</span>*/}
              </div>             
           </nav> 
          }
          
          
          
        </header>
        <div className={localStorage.getItem('USER_ROLE') === 'ADMIN' ? style.conteiner_row_one_admin : style.conteiner_row_one}>
            
            { localStorage.getItem('USER_ROLE') === 'ADMIN' ? 
            <span  className={style.text}>Администратор {localStorage.getItem('LOGIN')}</span>
            :
            <>
            { localStorage.getItem('USER_ROLE') === 'PROVIDER' ?
              <span  className={style.text}>Привет {localStorage.getItem('LOGIN')}!</span>
            :
            <>
              {localStorage.getItem('USER_ROLE') === 'USER' ?
                <span className={style.text}>Привет {localStorage.getItem('LOGIN')}!</span>
              :             
                <span className={style.text}></span>
              }
            </>                
            } 
            </>         
            } 

            {localStorage.getItem('USER_ROLE') === 'ADMIN' 
              ? 
              <>
                <span>
                <button className={context.isOrdersBtn ? style.function_btn_on : style.function_btn} onClick={() =>setButtonOrders()}>Orders</button>
                </span>
                <span>
                  <button className={context.isProvidersBtn ? style.function_btn_on : style.function_btn} onClick={() =>setButtonProviders()}>Providers</button> 
                </span>
                <span>
                  <button className={context.isProductsBtn ? style.function_btn_on : style.function_btn} onClick={() =>setButtonProducts()}>Products</button> 
                </span>
                <span>
                  <button className={context.isUsersBtn ? style.function_btn_on : style.function_btn} onClick={() =>setButtonUsers()}>Users</button> 
                </span>                                

                <Link to='/'>             
                  <button className={style.singout_btn} onClick={() =>logOut()} >Sing out</button> 
                </Link>
              </>                 
              :
              <>
                {localStorage.getItem('USER_ROLE') === 'PROVIDER' 
                ?
                <>
                  <span>
                    <button className={context.isProviderAllProductsBtn ? style.provider_btn_on : style.provider_btn} onClick={() =>setButtonAllProducts()}>All Products</button> 
                  </span>
                  <span>
                    <button className={context.isProviderAddProductsBtn ? style.provider_btn_on : style.provider_btn} onClick={() =>setButtonAddProducts()}>Add Product</button> 
                  </span>

                  <Link to='/'>             
                    <button className={style.singout_provider_btn} onClick={() =>logOut()} >Sing out</button> 
                  </Link>                  
                </>                                                 
                :
                <></>
                }
              </>
              }

              {localStorage.getItem('USER_ROLE') === 'USER'
              ?
              <>
                <span>
                  <button className={context.isCartBtn ? style.user_btn_on : style.user_btn} onClick={props.openCart}>Cart</button> 
                </span>
                <span>
                  <button className={context.isAccountBtn ? style.user_btn_on : style.user_btn} onClick={props.openAccount}>Account</button> 
                </span>              
              <Link to='/'>             
                <button className={style.singout_btn} onClick={() =>logOut()} >Sing out</button> 
              </Link> 
              </>

              :
              <></>
              }
              {localStorage.getItem('AUTH') !== 'AUTH' ?
              <>
              <Link to='/singup'>
                <button className={style.singup_btn}>Sing up</button> 
              </Link>
              <Link to='/singin'>          
                <button className={style.singin_btn}>Sing in</button>
              </Link>
              </> 
              :
              <></> 
              } 

            <span></span>
        </div>
        </div>
    );
}

export default Header;