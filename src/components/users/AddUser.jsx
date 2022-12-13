import style from './adduser.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../App';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';




const AddUser = () => { 

    const context = React.useContext(AppContext);    
    const navigate = useNavigate();
    
    

    const { register, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues: {
            login: context.dataForm.login,  
            email: context.dataForm.email,
            hasPhone: context.dataForm.hasPhone,
            phone: context.dataForm.phone,
            password: context.dataForm.password, 
            userrole: context.dataForm.userrole         
        }
    });

    const hasPhone = watch('hasPhone');

    const onClickBtn = (data) => {  
        context.setValues(data);        
        navigate('/useraddcard');
                       
    }  

    const correctPhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value)
        if(!phoneNumber){
            return value;
        } else {
            return phoneNumber.formatInternational();
        }
    }

    const closeAddUser =()=>{
        context.setAddUser(false); 
        context.setImage([]);
        context.setImageUrl([]); 
        context.setIsImageUrl(false);
        navigate('/paneladmin');
    }

    const fileReader = new FileReader();

    fileReader.onloadend = () =>{
        context.setImageUrl(fileReader.result);
        context.setIsImageUrl(true);
    }

    const handleOnChange=(event)=>{
        event.preventDefault();
        console.log("change", event.target.files);
        if (event.target.files && event.target.files.length){          
          const file = event.target.files[0];
          context.setImage(file);
          fileReader.readAsDataURL(file);  
        }
        
    };
    const handleDrop = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        console.log("change", event.target.files);
        if (event.dataTransfer.files && event.dataTransfer.files.length){          
          
          context.setImage(event.dataTransfer.files[0]);
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
                <p className={style.form_p}>Дoбавляем нового пользователя</p>
                
                <img 
                    src={context.isImageUrl ? context.imageUrl : '/img/avatar.png'}
                    className={context.isImageUrl ? style.user_avatar : style.avatar}
                    onDrop={handleDrop}
                    onDragEnter={handleDragEmpty}
                    onDragOver={handleDragEmpty}
                />
                <form onSubmit={handleSubmit(onClickBtn)} className={style.container_form}>
                    
                    <input
                      {...register('login', {
                        required: {
                            value: true,
                            message: '* поле обязательно для заполнения'
                        },
                        pattern: {
                            value: /^([^0-9]*)$/,
                            message: 'В логине должны быть только буквы'
                        }
                      })}
                      id="login"
                      type="text"
                      placeholder='Логин'
                      name='login'
                    /><br/>
                    {errors.login && <span className={style.error}>{errors.login.message}<br/></span>}
                    {context.errorServer.login && <span className={style.error}>{context.errorServer.login}<br/></span>}
                    <input
                        {...register('email', {
                            required: {
                                value: true,
                                message: '* поле Email обязательно для заполнения'
                            }
                        })}
                        id='email'
                        type="email"
                        placeholder='Email'
                        name='email'
                    />
                    {errors.email && <span className={style.error}><br/>{errors.email.message}<br/></span>}
                    <br/>    
                    <label>
                        <input 
                            {...register('hasPhone')}
                            type="checkbox"
                            name='hasPhone'
                        />
                        <span>Хотите ввести номер телефона?    </span>
                    </label>
                    {
                        hasPhone && (
                           <>
                           <br/> 
                           <input
                                {...register('phone')}
                                id='phone'
                                type="tel"
                                placeholder='Номер телефона'
                                name='phone'
                                onChange={(myInput) => {
                                    myInput.target.value = correctPhoneNumber(myInput.target.value);
                                }}
                            />
                           </>    
                        )
                    }
                    <br/>
                    <input
                        {...register('password', {
                            required: {
                                value: true,
                                message: '* поле Password обязательно для заполнения'
                            }
                        })}
                        id='password'
                        type="password"
                        placeholder='Пароль'
                        name='password'
                    />
                    {errors.password && <span className={style.error}><br/>{errors.password.message}<br/></span>}
                    {context.errorServer.password && <span className={style.error}>{context.errorServer.password}<br/></span>}
                    <br/>
                    <select
                        {...register('userrole', {
                            required: {
                                value: true,
                                message: '* поле USER_ROLE обязательно для заполнения'
                            }
                        })}
                        id='userrole'
                        type="userrole"
                        placeholder='Роль пользователя'
                        name='userrole'
                    >
                        <option value={'ROLE_USER'}>Покупатель</option>
                        <option value={'ROLE_ADMIN'}>Администратор</option>
                        <option value={'ROLE_PROVIDER'}>Продавец</option>
                    </select>
                    {context.errorServer.message && <span className={style.error}><br/>{context.errorServer.message}<br/></span>}
                    <br/>
                    {errors.userrole && <span className={style.error}>{errors.userrole.message}<br/></span>}
                    <br/> 

                    <div className={style.all_btn}>
                       
                       <button type='submit' className={style.adduser_btn_forward}>Apply</button>
                       
                       <label for="avatar" className={style.avatar_label}><span className={style.span}>Photo</span></label>                       
                        
                       <button className={style.adduser_btn_close} onClick={() => closeAddUser()}>Close</button>
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

export default AddUser