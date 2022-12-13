import Orders from "./Orders";
import style from "./allorders.module.css";
import React from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { useForm } from "react-hook-form";



const AllOrders = (props) =>{

  const context = React.useContext(AppContext);
  const [isSale, setIsSale] = React.useState(false);
  const [search, setSearch] = React.useState('');
  
  

  React.useEffect(()=>{    
  async function axiosOrders () {
  const { data } = axios({
    method:'GET',
    url:'http://localhost:8080/admin/orders',
    headers:{
            'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
    }
  }).then((response) =>{
    console.log(response.data);    
    context.setAccountItems(response.data);    
  });
  }

axiosOrders();

}, []);

const {register, handleSubmit, formState: { errors }} = useForm({});

const Sale=()=>{
    

    const { data } = axios({
      method:'GET',
      url:'http://localhost:8080/admin/orders',
      headers:{
              'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
      }
    }).then((response) =>{
      console.log(response.data); 
      console.log("отработал Sale")   
      context.setAccountItems(response.data);
      setIsSale(true);
    });      
}
const onSearchInput = (inputValue) => {
    setSearch(inputValue.target.value)
}
const onClickBtn = async (data) =>{

    const formData = new FormData();
    formData.append('search_orders', data.string);
    console.log(data);
    await axios({
        method:'POST',
        url:'http://localhost:8080/admin/search',
        headers:{
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
        },
        data: formData
      }).then((response) =>{
        console.log(response.data); 
        console.log("отработал поиск") 
        console.log(response.data.orders);  
        context.setAccountItems(response.data.orders);        
      }); 
}



    return(
        <>
        <div className={style.order_conteiner}>
            <span></span>
                <div className={style.search_block_order}>
                    <div className={style.search_input_block}>                        
                        <input type="text" onChange={onSearchInput} placeholder="Поиск по заказам: " />                        
                    </div>
                    <div className={style.search_input_block_write}>                        
                        <form className={style.form} onSubmit={handleSubmit(onClickBtn)}>
                            <div>                                
                                <input
                                    {...register('string', {
                                                required: {
                                                value: true,
                                                message: '* поле обязательно для заполнения'
                                                },
                                                pattern: {
                                                value: /^[a-zA-Z0-9-]{4}$/,
                                                message: '* Строка должна сожержать только 4 буквы или цифры'
                                                }
                                    })}
                                    type="text"
                                    name="string"
                                    id="string"
                                    placeholder="Поиск по последним 4 символам:"/> 
                                    {errors.string && <span className={style.error}>{errors.string.message}<br/></span>}
                                    {context.errorServer.string && <span className={style.error}>{context.errorServer.string}<br/></span>}
                            </div>
                            <button className={style.button} type="submit">Send</button>
                        </form>                        
                    </div>                    
                </div>            
            <span></span>
        </div>
        <div className={style.order_conteiner}>
            <span>
            </span>
            <div className={style.products}>   
            {  
              context.accountItems.filter((item) => item.number.includes(search)).map(obj => {
                return(
                  <Orders
                    Sale={Sale}
                    isSale={isSale}
                    setIsSale={setIsSale}
                    key={obj.id}
                    {...obj}
                  />
                )
              })
            }
            </div> 
            <span></span>   
        </div>        
        </>

    
    );
}

export default AllOrders