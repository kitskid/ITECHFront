import style from './cartItem.module.css';
import React from 'react';
import axios from 'axios';

const CartItem = (props) =>{

  const [avatar, setAvatar] = React.useState();

  const getToken=()=>{
    return localStorage.getItem('USER_KEY');
  }
  

  React.useEffect(()=>{        
       
      async function axiosFotoProduct () {
        
         const path = await axios({
             methot: "GET",
             responseType: 'arraybuffer', 
             url: `http://localhost:8080/main/api/product/image/get/${props.fileName}`, 
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
     
  }, []); 


  let myId = props.myId;
  let id = props.id;

    return (
        <div className={style.cart_item}>
              <img className={style.cart_img} src={avatar} alt='iPhone' />
              <div className={style.text}>                
                <h3 className={style.cart_title}>{props.name}</h3>
                <p className={style.description}>{props.description}</p>
                <p className={style.description}>{props.providerName}</p>                  
                <span className={style.cart_price}>{props.price} руб</span>
              </div>

              <button onClick={() => props.cartRemoveItem({id, myId})} className={style.close_btn}>X</button>
        </div>
    );
}

export default CartItem;