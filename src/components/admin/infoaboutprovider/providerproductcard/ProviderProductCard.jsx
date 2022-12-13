import React from 'react';
import style from './providerproductcard.module.css';
import axios from 'axios';
import { AppContext } from '../../../../App'; 

const ProviderProductCard = (props) =>{

    const context = React.useContext(AppContext);
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
        let provider = props.provider;
        let fileName = props.fileName;
        let url = avatar;
        let categoryName = props.nameCategory

        context.setEditProduct({id, name, description, price, provider, fileName, url, categoryName});
        console.log('отработало');
                
        
    }

    return(
        <div className={style.product_item}>

            <div>
              <img src={avatar ? avatar : '/img/avatar.png'} 
              className={avatar ? style.user_avatar : style.avatar}
              />
            </div>
            <div>
              <p className={style.login}>Наименование товара: {props.name}</p>
              <p className={style.email}>Описание товара: {props.description}</p>
              <p className={style.phone}>Продавец: {props.providerName}</p>
              <p className={style.role}>Цена товара: {props.price}</p>
              <p className={style.id}>ID товара: {props.id}</p>
              <p className={style.id}>Категория товара: {props.nameCategory}</p>                
            </div> 
            <div>
              <div className={style.button_all}>
                 <button className={style.all_btn} onClick={EditProduct}>Edit</button>
                 <button className={style.all_btn} onClick={DeleteProduct}>Delete</button>
                 <button className={style.all_btn}>Info</button>                
              </div>                
            </div>          
    
        </div>
    );
}

export default ProviderProductCard