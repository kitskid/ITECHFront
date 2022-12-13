import style from './favorites.module.css';
import React from 'react';
import axios from "axios";
import FavoritesCard from './favoritesCard/FavoritesCard';
import { AppContext } from '../../App';



const Favorites = (props) => {

    const context = React.useContext(AppContext);

    const onAddDelCart = async (obj) => {
      const findObj = context.cartItems.find(objFind => objFind.myId === obj.myId);

      if(findObj){
        const { data } = await axios.delete(`https://63500d6078563c1d82b78f08.mockapi.io/api/cart/${findObj.id}`);
        context.setCartItems(prev=> prev.filter(cartItem => cartItem.myId !== findObj.myId));
      } else {
        const { data } = await axios.post('https://63500d6078563c1d82b78f08.mockapi.io/api/cart', obj);
        context.setCartItems([...context.cartItems, data]);
      }
        
      }
      const onRemoveFavorites = async (obj) => {
        const { data } = await axios.delete(`https://63500d6078563c1d82b78f08.mockapi.io/api/favorites/${obj.id}`);
        context.setFavorites((prev) => prev.filter(item => Number(item.myId) !== Number(obj.myId)));
      }

    return(
        <div className={style.product_section}>

            <div className={style.search}>          
                <h2>Избранные товары</h2>            
            </div>
        
            <div className={style.product}>

            {
                context.favorites.map(obj => {
                return(                     
                    <FavoritesCard
                      myId={obj.myId} 
                      key={obj.key}
                      id={obj.id}
                      title={obj.title}                      
                      price={obj.price}
                      img={obj.img} 
                      description={obj.description}
  
                      onClickPlus={
                        (cartObj) => {                        
                        onAddDelCart(cartObj);
                      }}
  
                      onClickFavorite={
                        (obj) => {                          
                          onRemoveFavorites(obj);
                        }
                      }                
                  
                    />                    
                )
                })
            }          

        </div>
      </div> 
    );
}
export default Favorites;