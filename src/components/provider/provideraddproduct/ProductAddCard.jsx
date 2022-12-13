import style from './productaddcard.module.css';
import React from 'react';
import { AppContext } from '../../../../App';
import { Link } from 'react-router-dom';
import { addAvatarProduct, addProduct} from '../../../../api/requests';

const ProductAddCard = () => { 

    const context = React.useContext(AppContext);        
    

    const onClickBtn = () => {      
        console.log("то что в дате: cart_id - " + context.dataFormProduct.cat_id + " prov_id - " + context.dataFormProduct.prov_id);         
        onAddToServer({...context.dataFormProduct});
        context.setErrorServer([]);             
        context.setDataFormProduct([]); 
        context.setImageProduct([]);
        context.setImageProductUrl([]); 
        context.setIsImageProductUrl(false);             
    }    

    const onAddToServer = async () => { 
        
        const formData = new FormData();
        formData.append('file', context.imageProduct);
        formData.append('name', context.dataFormProduct.name);

        const formDataProduct = new FormData();
        formDataProduct.append('name', context.dataFormProduct.name);
        formDataProduct.append('description', context.dataFormProduct.description);
        formDataProduct.append('price', context.dataFormProduct.price);
        formDataProduct.append('cat_id', context.dataFormProduct.cat_id);
        formDataProduct.append('prov_id', context.dataFormProduct.prov_id);

        console.log(formDataProduct);

        await addProduct(formDataProduct).then((response)=>{
            if(response.status === 200){                
                console.log("Наконецто добавились");
                context.setDataFormProduct([]);                                  
            }
            else if(response.status===406){
                console.log('статус показывает')
            } else{
                console.log('ничего не показывает')
            }
        }).catch((err)=>{
            if(err && err.response){
                console.log(err.response.data.name);
                context.setErrorServer(err.response.data);                
            }
        })    

        addAvatarProduct(formData).then((response)=>{
            if(response.status === 200){                
                console.log("фоточку загрузили");
                      
            }
            else if(response.status===406){
                console.log('статус показывает')
            } else{
                console.log('ничего не показывает')
            }
        }).catch((err)=>{
            if(err && err.response){
                console.log(err.response.data);
                context.setErrorServer(err.response.data);                
            }
        })     
    }   
     

    return(       
        
        <div className={style.adduser_page}>            
           <div className={style.container}>
           <span></span>
           <div className={style.form_div}>
                <p className={style.form_p}>Дoбавляем новый товар пользователя</p>
                <img 
                    src={context.isImageProductUrl ? context.imageProductUrl : '/img/avatar.png'}
                    className={context.isImageProductUrl ? style.user_avatar : style.avatar}
                />    
                <form onSubmit={onClickBtn} className={style.container_form}>
                    <input                      
                      id="name"
                      type="text"
                      placeholder={context.dataFormProduct.name}
                      name='name'
                      readOnly
                    />
                    <br/>                    
                    <input                        
                        id='description'
                        type="text"
                        placeholder={context.dataFormProduct.description}
                        name='description'
                        readOnly
                    />                    
                    <br/> 
                    
                    <input                        
                        id='prov_id'
                        type="prov_id"
                        placeholder={context.dataFormProduct.prov_id}
                        name='prov_id'
                        readOnly
                    />
                    <br/> 

                    <input                        
                        id='cat_id'
                        type="cat_id"
                        placeholder={context.dataFormProduct.cat_id}
                        name='cat_id'
                        readOnly
                    />                     
                    <br/>
                    <input                        
                        id='price'
                        type="number"
                        placeholder={context.dataFormProduct.price}
                        name='price'
                        readOnly
                    />                     
                    <br/>                    
                    <br/> 
                    <div className={style.all_btn}>
                       <Link to='/productadd'>
                         <button className={style.adduser_btn_close}>Back</button>
                       </Link>
                       <Link to='/'> 
                          <button onClick={onClickBtn} className={style.adduser_btn_forward}>Send</button>                      
                       </Link>
                       <span></span> 
                    </div>                                            
                                        
                </form>
            </div>
            <span></span>                   
           </div>           
        </div>        
        
    );
}

export default ProductAddCard