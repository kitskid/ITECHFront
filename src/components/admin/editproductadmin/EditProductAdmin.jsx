import style from './editproductadmin.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProvidersService from '../../../services/ProvidersService';
import ProductsService from '../../../services/ProductsService';




const EditProductAdmin = () => { 

    const context = React.useContext(AppContext);    
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);

    React.useEffect(()=>{                 

        async function axiosCategories () {
            ProductsService.getCategories().then((response) =>{
                setCategories(response.data)
                console.log(response.data)
            })
        }
        async function axiosProviders () {
            ProvidersService.getProviders().then((response) =>{
                setProviders(response.data)
                console.log(response.data)
            })
        }
        axiosProviders();
        axiosCategories();
    }, []);
    
    

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            name: context.editProduct.name,  
            description: context.editProduct.description,
            prov_id: context.editProduct.prov_id,
            price: context.editProduct.price,
            cat_id: context.editProduct.cat_id                  
        }
    });
    

    const onClickBtn = (data) => {  
        context.setValuesProduct(data);
        console.log(data);        
        navigate('/productupdatecardadmin');
                       
    }  
    

    const closeAddProduct =()=>{
        context.setIsEditProduct(false); 
        context.setImageProduct([]);
        context.setImageProductUrl([]); 
        context.setIsImageProductUrl(false);
        //navigate('/paneladmin');
    }

    const fileReader = new FileReader();

    fileReader.onloadend = () =>{
        context.setImageProductUrl(fileReader.result);
        context.setIsImageProductUrl(true);
    }

    const handleOnChange=(event)=>{
        event.preventDefault();
        console.log("change", event.target.files);
        if (event.target.files && event.target.files.length){          
          const file = event.target.files[0];
          context.setImageProduct(file);
          fileReader.readAsDataURL(file);  
        }
        
    };
    const handleDrop = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        console.log("change", event.target.files);
        if (event.dataTransfer.files && event.dataTransfer.files.length){          
          
          context.setImageProduct(event.dataTransfer.files[0]);
          fileReader.readAsDataURL(event.dataTransfer.files[0]);  
        }
    };

    const handleDragEmpty = (event) =>{
        event.preventDefault();
        event.stopPropagation();
    }

    return(       
        
        <div className={style.adduser_page}>            
           <div className={style.container}>
           <span></span>
           <div className={style.form_div}>
                <p className={style.form_p}>Редактируем товар</p>
                
                <img 
                    src={context.isImageProductUrl ? context.imageProductUrl :  context.editProduct.url}
                    className={context.isImageProductUrl ? style.user_avatar : style.avatar}
                    onDrop={handleDrop}
                    onDragEnter={handleDragEmpty}
                    onDragOver={handleDragEmpty}
                />
                <form onSubmit={handleSubmit(onClickBtn)} className={style.container_form}>
                    
                    <input
                      {...register('name', {
                        required: {
                            value: true,
                            message: '* поле обязательно для заполнения'
                        },
                        pattern: {
                            value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                            message: '* Наименование товара может сожержать от 2 до 20 букв или цифр, первый символ обязательно буква'
                        }
                      })}
                      id="name"
                      type="text"
                      placeholder='Наименование товара'
                      name='name'
                    /><br/>
                    {errors.name && <span className={style.error}>{errors.name.message}<br/></span>}
                    {context.errorServer.name && <span className={style.error}>{context.errorServer.name}<br/></span>}
                    <input
                        {...register('description', {
                            required: {
                                value: true,
                                message: '* поле обязательно для заполнения'
                            }
                        })}
                        id='description'
                        type="text"
                        placeholder='Описание товара'
                        name='description'
                    />
                    {errors.description && <span className={style.error}><br/>{errors.description.message}<br/></span>}
                    <br/>
                    <select
                        {...register('prov_id', {
                            required: {
                                value: true,
                                message: '* поле обязательно для заполнения'
                            }
                        })}
                        id='prov_id'
                        type="number"
                        placeholder='Продавец'
                        name='prov_id'                    
                    >   
                        {
                           providers.map(provider =>{
                            return(
                               <option value={provider.id}>{provider.login}</option>  
                            )
                           }) 
                        } 

                    </select>                    
                    {context.errorServer.prov_id && <span className={style.error}>{context.errorServer.prov_id}<br/></span>}
                    {errors.prov_id && <span className={style.error}><br/>{errors.prov_id.message}<br/></span>}
                    <br/>
                    <select
                        {...register('cat_id', {
                            required: {
                                value: true,
                                message: '* поле обязательно для заполнения'
                            }
                        })}
                        id='cat_id'
                        type="number"
                        placeholder='Категория товара'
                        name='cat_id'
                    >
                        {
                            categories.map(category =>{
                                return(
                                  <option value={category.id}>{category.name}</option>  
                                )                                
                            })
                        }

                    </select>
                    {context.errorServer.message && <span className={style.error}><br/>{context.errorServer.cat_id}<br/></span>}
                   
                    {errors.cat_id && <span className={style.error}>{errors.cat_id.message}<br/></span>}
                    <br/> 
                    <input
                        {...register('price', {
                            required: {
                                value: true,
                                message: '* поле обязательно для заполнения'
                            }
                        })}
                        id='price'
                        type="number"
                        placeholder='Цена'
                        name='price'
                        min={1}
                        max={10000000}
                        

                    />
                    <br/>
                    {errors.price && <span className={style.error}><br/>{errors.price.message}<br/></span>}
                    {context.errorServer.price && <span className={style.error}>{context.errorServer.price}<br/></span>}
                    <br/>                    

                    <div className={style.all_btn}>
                       
                       <button type='submit' className={style.adduser_btn_forward}>Apply</button>
                       
                       <label for="avatar" className={style.avatar_label}><span className={style.span}>Photo</span></label>                       
                        
                       <button className={style.adduser_btn_close} onClick={() => closeAddProduct()}>Close</button>
                       <input 
                          id='avatar'
                          name='avatar'
                          type="file"
                          onChange={handleOnChange}
                          className={style.uploader_btn}
                          accept="image/*, .png, .ipg, .gif, .web"
                        />                       
                    </div>                                            
                                        
                </form>
            </div>
            <span></span>                   
           </div>           
        </div>        
        
    );
}


export default EditProductAdmin