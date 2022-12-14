import React from 'react';
import style from './productcard.module.css';
import axios from 'axios';
import { AppContext } from '../../../../App'; 

const ProductCard = (props) =>{

    const context = React.useContext(AppContext);
    const [avatar, setAvatar] = React.useState();
    const [currentCard, setCurrentCard] = React.useState();

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

    const DeleteProduct = async () =>{
        let id = props.id;
        props.DeleteProduct({id});
        console.log('что-то происходит');
    }
    const EditProduct = () =>{
        console.log('кнопка сработала')
        context.setIsEditProduct(true);
        let id = props.id;
        let name = props.name;
        let description = props.description;
        let price = props.price;
        let providerName = props.providerName;
        let fileName = props.fileName;
        let url = avatar;
        let categoryName = props.nameCategory

        context.setEditProduct({id, name, description, price, providerName, fileName, url, categoryName});
        console.log('отработало');
    }
    const Info = () => {

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
            
             <img src={avatar ? avatar : '/img/avatar.png'} 
             className={avatar ? style.user_avatar : style.avatar}
             />              
                   
            <p className={style.login}>Наименование товара: {props.name}</p>
            <p className={style.email}>Описание товара: {props.description}</p>
            <p className={style.phone}>Продавец: {props.providerName}</p>
            <p className={style.role}>Цена товара: {props.price}</p>
            <p className={style.id}>ID товара: {props.id}</p>
            <p className={style.id}>Категория товара: {props.nameCategory}</p>
            <div className={style.button_all}>
               <button className={style.all_btn} onClick={EditProduct}>Edit</button>
               <button className={style.all_btn} onClick={DeleteProduct}>Delete</button>
               <button className={style.all_btn} onClick={Info}>Info</button>                
            </div>
            
        </div>
    );
}

export default ProductCard