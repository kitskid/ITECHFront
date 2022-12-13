import CartItem from "./cart-item/CartItem";
import style from "./cart.module.css";
import React from "react";
import { AppContext } from "../../App";
import axios from "axios";



const Cart = (props) =>{

  const context = React.useContext(AppContext);
    const makeOrder = () =>{      
      
        const { data } = axios({
          method:'GET',
          url:'http://localhost:8080/order/create',
          headers:{
                  'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
          }
        }).then((response) =>{
          console.log(response.data);
          context.setCartOpened(false);
          context.setAccountOpened(true);
        });
     
      context.setCartItems([]);
    }
    return(
      <div className={style.overlay}>
        <div className={style.cart}>
          <div className={style.title_block}>
            <h2>Корзина</h2>
            <button className={style.close_btn} onClick={props.closeCart}>X</button>
          </div> 
          {
            
            context.cartItems ?
            
            <div className={style.cart_list}> 
            {
              context.cartItems.map(obj => {
                return(
                  <CartItem 
                    cartRemoveItem={props.cartRemoveItem}
                    key={obj.id}
                    myId={obj.myId}
                    id={obj.id}
                    name={obj.name}                  
                    price={obj.price}
                    description={obj.description}                     
                    fileName={obj.fileName} 
                    providerName={obj.providerName}                
                  />
                )
              })
            }              
            </div>            
            : <h2>Здесь могут быть ваши товары</h2> 
          }
          

         

          <div className={style.total_price}>
            <p className='total-price-text'>Итог: </p>
            <p className={style.total_price_sum}>{props.totalPrice} руб.</p>
            <button className={style.total_price_btn} onClick={makeOrder} >Заказать</button>
          </div>

        </div>
      </div>
    );
}

export default Cart;