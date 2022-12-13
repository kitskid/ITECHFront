import style from './singup.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';



const Singup = () => { 

    const context = React.useContext(AppContext);   

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            firstName: context.dataForm.login            
        }
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {  
        context.setValues(data);             
        navigate('/singupsteptwo');
    }

    return(

        <div className={style.singin_page}>
        <div className={style.container}>
             <p className={style.login}>REGISTRATION</p>                
             <form onSubmit={handleSubmit(onSubmit)} className={style.container_form}>
                 <div>
                 <input
                      {...register('login', {
                        required: {
                            value: true,
                            message: 'Поле обязательно для заполнения'
                        },
                        pattern: {
                            value: /^([^0-9]*)$/,
                            message: 'В логине должны быть только буквы'
                        }
                      })}
                      id="login"
                      type="text"
                      placeholder='login'
                      name='login'
                    /><br/>
                    {errors.login && <span className={style.error}>{errors.login.message}<br/></span>}
                     
                 </div>
                 <div>
                     <button type='submit' className={style.singin_btn}>Forward</button>           
                 </div>        
             </form>
        </div>
     </div>        
        
    );
}

export default Singup