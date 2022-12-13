import style from './order.module.css';
import React from 'react';
import axios from 'axios';


const Order = (props) =>{

  const [product, setProduct] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const getToken=()=>{
    return localStorage.getItem('USER_KEY');
  }

  React.useEffect(()=>{
    async function axiosFotoProduct () {
        
      const path = await axios({
          methot: "GET",
          responseType: 'arraybuffer', 
          url: `http://localhost:8080/main/api/product/image/get/${props.product.fileName}`, 
          headers:{
           'Authorization':'Bearer '+getToken(),         
          }
      }).then(res => {
      const blob = new Blob([res.data], {type: 'image/png'}) 
      const url = URL.createObjectURL(blob); 
       setAvatar(url);                       
      })            
     

         
   }

 axiosFotoProduct();  
    setProduct(props.product);
    console.log(product);
  }, []);


  let myId = props.myId;
  let id = props.id;

    return (
        <div className={style.cart_item}>
              <img className={style.cart_img} src={avatar}/>
              <div className={style.text}>                
                <h3 className={style.cart_title}>
                <p>{props.number}</p>  
                 
                </h3>
                <p className={style.description}>{props.product.description}</p>
                <p className={style.description}>{props.product.providerName}</p> 
                <span className={style.end_line}>
                  <span className={style.cart_price}>{props.price} руб</span>
                  <span className={style.status}>Статус заказа: {props.status}</span>
                </span>                 
                
              </div>

              <div>
                {props.isSale ? <p className={style.thenks}>спасибо за покупку!</p> : <></>}
              </div>
        </div>
    );
}

export default Order;