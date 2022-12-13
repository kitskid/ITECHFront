import { AppContext } from "../../App";
import React from "react";
import axios from "axios";
import style from './info.module.css';
import { Link } from 'react-router-dom';


const Info = () =>{
     
    const context = React.useContext(AppContext); 
    const [avatar, setAvatar] = React.useState();
    
    
    React.useEffect(()=>{        
         
        async function axiosFotoProduct () {
          
           const path = await axios({
               methot: "GET",
               responseType: 'arraybuffer', 
               url: `http://localhost:8080/main/api/product/image/get/${context.infoCard.fileName}`, 
               headers:{
                'Authorization':'Bearer '+getToken(),         
               }
           }).then(res => {
           const blob = new Blob([res.data], {type: 'image/png'}) 
            const url = URL.createObjectURL(blob); 
            setAvatar(url); 
            console.log("перерисовали картинку")                      
           })           
        }

      axiosFotoProduct();    
       
    }, []); 
    
    const getToken=()=>{
        return localStorage.getItem('USER_KEY');
    }
    const CloseInfo =()=>{
        context.setInfoCard([]);
        context.setIsInfo(false);
    }

    const onAddCart = async (obj) => {

        let findObj = false;
       if (context.cartItems !== []) {
         findObj = context.cartItems.find(objFind => objFind.id === obj.id);
       } 
       console.log(findObj);
       if(findObj){
 //        const { data } = await axios.delete(`https://63500d6078563c1d82b78f08.mockapi.io/api/cart/${findObj.id}`);
         const { data } = await axios({
           method:'GET',
           url:`http://localhost:8080/cart/delete/${findObj.id}`,
           headers:{
                   'Authorization':'Bearer '+getToken()
           }
         }) 
         context.setCartItems(prev=> prev.filter(cartItem => cartItem.id !== findObj.id));
       } else {
 //        const { data } = await axios.post('https://63500d6078563c1d82b78f08.mockapi.io/api/cart', obj);
         const { data } = await axios({
           method:'GET',
           url:`http://localhost:8080/cart/add/${obj.id}`,
           headers:{
                   'Authorization':'Bearer '+getToken()
           }          
         })
         context.setCartItems([...context.cartItems, obj]);
       }      
     }

    const onClickPlus = () => {
      
        let key = context.infoCard.key;    
        let id = context.infoCard.id;      
        let name = context.infoCard.name;
        let description = context.infoCard.description;    
        let price = context.infoCard.price;
        let providerName = context.infoCard.providerName;
        let fileName = context.infoCard.fileName;        
        let nameCategory = context.infoCard.nameCategory;
        let avatarCard = avatar;
        
        onAddCart({id, key, name, price, fileName, description, providerName, nameCategory, avatarCard});
        
      }
      let id = context.infoCard.id;
      let myId = context.infoCard.id;  

    return(
        <div className={style.container}>
            <div></div>
            <div>
                <div className={style.product_item}>
                    {localStorage.getItem('USER_ROLE') === "USER" ?
                        <button className={style.add_cart} onClick={CloseInfo}> 
                        X
                        </button>                    
                     :
                     <></>
                     }

                    <img className={style.product_image} src={context.infoCard.avatarCard ? context.infoCard.avatarCard : '/img/avatar.png'} alt={context.infoCard.name}/>
                
                    <p className={style.product_title}>
                    <Link to='/'>
                    <button className={style.button_info}>{context.infoCard.name}</button> 
                    </Link>                 
                    </p>
                    <p className={style.product_description}>{context.infoCard.description}</p>
                    <p className={style.id}>{context.infoCard.nameCategory}</p>
                    <p className={style.phone}>Продавец: {context.infoCard.providerName}</p>
                    <p className={style.price}>Цена</p>
                
                <div className={style.product_price}>
                    <span className={style.cart_price}>{context.infoCard.price} руб</span>
                    {localStorage.getItem('USER_ROLE') !== "USER" ?
                    <>
                    <button className={style.add_cart} onClick={CloseInfo}> 
                       X
                    </button>
                    </>
                    :
                    <button className={context.itemAdded({id, myId}) ? style.add_cart_big : style.add_cart} onClick={onClickPlus}> 
                        <img src={context.itemAdded({id, myId}) ? '/img/check.png' : '/img/icons8-plus-24.png'} alt="." />
                    </button>
                    }
                </div>
                </div>                  
            </div>
            <div></div>            
        </div>


    )
}
export default Info;