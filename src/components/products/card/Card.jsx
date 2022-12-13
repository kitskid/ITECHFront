import style from './card.module.css';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Card = (props) =>{

    const context = React.useContext(AppContext);  
    const [avatar, setAvatar] = React.useState();
    const [currentCard, setCurrentCard] = React.useState();

    const getToken=()=>{
      return localStorage.getItem('USER_KEY');
    }
    

    React.useEffect(()=>{        
         
        async function axiosFotoProduct () {
          // if(!context.isloading){
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
          // } 

              
        }

      axiosFotoProduct();    
       
    }, []);  



    let id = props.id;
    let myId = props.id;     
    


    const onClickPlus = () => {
      
      let key = props.key;    
      let id = props.id;      
      let name = props.name;
      let description = props.description;    
      let price = props.price;
      let providerName = props.providerName;
      let fileName = props.fileName;        
      let nameCategory = props.nameCategory;
      let avatarCard = avatar;
      
      props.onClickPlus({id, key, name, price, fileName, description, providerName, nameCategory, avatarCard});
      
    }
    
    const gotoInfo = () => {

      context.setInfoCard([]);
      context.setIsInfo(false);
      if(props.change){
        props.setChange(false);
      } else {
        props.setChange(true);
      }
   
      
      let key = props.key;    
      let id = props.id;      
      let name = props.name;
      let description = props.description;    
      let price = props.price;
      let providerName = props.providerName;
      let fileName = props.fileName;        
      let nameCategory = props.nameCategory;
      let avatarCard = avatar;

      const obj = {id, key, name, price, fileName, description, providerName, nameCategory, avatarCard}
      // const formData = new FormData();
      // formData.append('id', id);
      let findObj = false;
      if (context.productsAll !== []) {
        findObj = props.productsAll.find(objFind => objFind.id === id);
      }
      console.log("obj " + findObj.id);
      context.setInfoCard(obj);
      setCurrentCard(obj);

      context.setIsInfo(!context.isIfo);
      console.log("содержимое карточки " + currentCard);
      
    } 

    return(
        
      
        <div className={style.product_item}>
          {
            props.isloading ?
            <ContentLoader 
              speed={2}
              width={240}
              height={400}
              viewBox="0 0 300 460"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="5" rx="3" ry="3" width="177" height="27" /> 
              <rect x="40" y="57" rx="3" ry="3" width="223" height="262" /> 
              <rect x="0" y="335" rx="3" ry="3" width="122" height="17" /> 
              <rect x="0" y="359" rx="3" ry="3" width="182" height="17" /> 
              <rect x="0" y="382" rx="3" ry="3" width="122" height="17" /> 
              <rect x="0" y="428" rx="3" ry="3" width="122" height="26" /> 
              <rect x="178" y="428" rx="3" ry="3" width="122" height="26" />
            </ContentLoader> :
            <>
              
              <img className={style.product_image} src={avatar ? avatar : '/img/avatar.png'} alt={props.name}/>
            
              <p className={style.product_title}>
              
                 <button onClick={gotoInfo} className={style.button_info}>{props.name}</button> 
                              
              </p>
              <p className={style.product_description}>{props.description}</p>
              <p className={style.id}>{props.nameCategory}</p>
              <p className={style.phone}>Продавец: {props.providerName}</p>
              <p className={style.price}>Цена</p>
            
            <div className={style.product_price}>
              <span className={style.cart_price}>{props.price} руб</span>
              {localStorage.getItem('USER_ROLE') !== "USER" ? 
                <Link to='/singup' className={style.add_cart}>
                  <button className={style.add_cart_inblok} >                
                    <img src={'/img/icons8-plus-24.png'} alt="." />
                  </button>                   
                </Link>
             
              :
                <button className={context.itemAdded({id, myId}) ? style.add_cart_big : style.add_cart} onClick={onClickPlus}>                
                  <img src={context.itemAdded({id, myId}) ? '/img/check.png' : '/img/icons8-plus-24.png'} alt="." />
                </button>
              }
            </div>
            </>  
          }           
        </div>  
    );
}

export default Card;