import Order from "./order/Order";
import style from "./account.module.css";
import React from "react";
import { AppContext } from "../../App";
import axios from "axios";



const Account = (props) =>{

  const context = React.useContext(AppContext);
  const [isSale, setIsSale] = React.useState(false);
  const [sumPrice, setSumPrice] = React.useState(0);

  React.useEffect(()=>{    
  async function axiosOrders () {
  const { data } = axios({
    method:'GET',
    url:'http://localhost:8080/orders',
    headers:{
            'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
    }
  }).then((response) =>{
    console.log(response.data);    
    context.setAccountItems(response.data);
     
    setSumPrice(context.accountItems.reduce((sum, objPrice) => sum + Number(objPrice.price), 0))
      
  });
  }

axiosOrders();

}, []);

const Sale=()=>{
    if(!isSale){
    axios({
      method:'GET',
      url:'http://localhost:8080/orders/sale',
      headers:{
              'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
      }
    }).then((response) =>{
      console.log(response.data);   
    });

    const { data } = axios({
      method:'GET',
      url:'http://localhost:8080/orders',
      headers:{
              'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
      }
    }).then((response) =>{
      console.log(response.data);    
      context.setAccountItems(response.data);
      setIsSale(true);
    });      
    }

}



    return(
      <div className={style.overlay}>
        <div className={style.cart}>
          <div className={style.title_block}>
            <h2>Заказы</h2>
            <button className={style.close_btn} onClick={props.closeAccount}>X</button>
          </div> 
          {
            
            context.cartItems ?
            
            <div className={style.cart_list}> 
            {
              context.accountItems.map(obj => {
                return(
                  <Order 
                    isSale={isSale}
                    key={obj.id}
                    {...obj}
                  />
                )
              })
            }              
            </div>            
            : <h2>Здесь могут быть ваши товары</h2> 
          }
          

         

          <div className={style.total_price}>
            <p className='total-price-text'>Итог: </p>
            <p className={style.total_price_sum}>{sumPrice} руб.</p>
            <button className={style.total_price_btn} onClick={Sale}>Оплатить</button>
          </div>

        </div>
      </div>
    );
}

export default Account