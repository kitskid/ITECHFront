import style from './favoritesCard.module.css';
import React from 'react';
import { AppContext } from '../../../App';

const FavoritesCard = (props) =>{

  const context = React.useContext(AppContext);

  let id = props.id;
  let myId = props.myId;   
    
    const onClickPlusFavorite = () => {  
      
      props.onClickFavorite({id,myId});
    }

    const onClickPlus = () => {
      
      let title = props.title;
      let id = props.id;
      let price = props.price;
      let img = props.img;
      let key = props.key;
      let myId = props.myId;
      
      props.onClickPlus({id, myId, key, title, price, img});
      
    }

    return(
        <div className={style.product_item}>          
          <button className={style.favorite_btn_on} onClick={onClickPlusFavorite}>Удалить товар из избранного</button>
            <img className={style.product_image} src={props.img} alt={props.title}/> 
            <p className={style.product_title}>{props.title}</p>
            <p className={style.product_description}>{props.description}</p>
            <p className={style.price}>Цена</p>
            
            <div className={style.product_price}>
              <span className={style.cart_price}>{props.price} руб</span>
              <button className={context.itemAdded({id, myId}) ? style.add_cart_big : style.add_cart} onClick={onClickPlus}>                
              <img src={ context.itemAdded({id, myId}) ? '/img/check.png' : '/img/icons8-plus-24.png'} />
              </button>
            </div>
        </div>  
    );
}

export default FavoritesCard;