import style from './orders.module.css';
import React from 'react';
import axios from 'axios';
import { AppContext } from '../../../App';
import ProductsService from '../../../services/ProductsService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


const Orders = (props) =>{

  const [product, setProduct] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const [status, setStatus] = useState([]);
   const [isOn, setIsOn] = React.useState(false);

  const context = React.useContext(AppContext);
 

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

        async function axiosCategories () {
            ProductsService.getStatus().then((response) =>{
                setStatus(response.data)
                console.log(response.data)
            })
        } 
        const { register, handleSubmit, formState: { errors }} = useForm({});        

  const setButtonChangeOrders =()=>{
    if(isOn){        
        setIsOn(false);
    } else {
        axiosCategories();
        setIsOn(true);
    }
  }
  const onClickBtn = async (data) =>{
    const formData = new FormData();
    formData.append('order_id', props.id);
    formData.append('status', data.cat_id);

    await axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            // 'Content-Type': 'application/json' 
        },
        url: 'http://localhost:8080/admin/update/status',
        data: formData     
    }).then(context.isChangeStatus ? context.setIsChangeStatus(false) : context.setIsChangeStatus(true));

    setIsOn(false);
    // props.setIsSale(false);
    props.Sale();
    console.log("отроаботал онклик")
  }
  let myId = props.myId;
  let id = props.id;

    return (
        
        <div className={style.cart_item}>
              <img className={style.cart_img} src={avatar}/>
              <div className={style.text}>                
                <h3 className={style.cart_title}><p>{props.number}</p></h3>                 
                <p className={style.description}>{props.product.name}</p>
                <p className={style.description}>{props.product.description}</p>
                <p className={style.description}>{props.product.providerName}</p> 
                <br/>
                <span className={style.cart_price}>{props.price} руб</span>
                <br/>
                <span className={style.status}>Статус заказа: {props.status}</span>
              </div>
                {isOn ?
                <div>
                    <div>
                    <form onSubmit={handleSubmit(onClickBtn)} className={style.container_form}>
                        <select
                            {...register('cat_id', {
                                required: {
                                    value: true,
                                    message: '* поле обязательно для заполнения'
                                }
                            })}
                            id='cat_id'
                            type="changestatus"
                            placeholder='Категория товара'
                            name='cat_id'
                        >
                            {
                                status.map(status =>{
                                    return(
                                    <option value={status}>{status}</option>  
                                    )                                
                                })
                            }

                        </select>

                        <button type='submit' className={style.function_btn}>Send</button>
                    </form>
                    </div>
                    
                </div> 
                :
                <button className={style.function_btn} onClick={() =>setButtonChangeOrders()}>CHANGE STATUS</button>}          
               
           

        </div>            
       

    );
}

export default Orders;