import style from './singup.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

const Singup2 = () => {

    const context = React.useContext(AppContext); 

    const { register, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues: {
            email: context.dataForm.email,
            hasPhone: context.dataForm.hasPhone,
            phone: context.dataForm.phone
        }
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {  
        context.setValues(data);    
        navigate('/singupresult');
    }

    const hasPhone = watch('hasPhone');

    const correctPhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value)
        if(!phoneNumber){
            return value;
        } else {
            return phoneNumber.formatInternational();
        }
    }

    return(
        <div className={style.singin_page}>
        <div className={style.container}>
            <p className={style.login}>REGISTRATION</p>                
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Поле Email обязательно для заполнения'
                            }
                        })}
                        id='email'
                        type="email"
                        placeholder='email'
                        name='email'
                    />                   

                </div>
                <div>
                    <label>
                        <input 
                            {...register('hasPhone')}
                            type="checkbox"
                            name='hasPhone'
                        />
                        Хотите ввести номер теефона?
                    </label>
                    {
                        hasPhone && (
                           <>
                           <br></br> 
                           <input
                                {...register('phone')}
                                id='phone'
                                type="tel"
                                placeholder='phone'
                                name='phone'
                                onChange={(myInput) => {
                                    myInput.target.value = correctPhoneNumber(myInput.target.value);
                                }}
                            />                            
                           </>  
                        )
                    }                    
                </div>
                <div>
                    <input
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Поле Password обязательно для заполнения'
                            }
                        })}
                        id='password'
                        type="password"
                        placeholder='password'
                        name='password'
                    />
                    {errors.password && <span className={style.error}><br/><br/>{errors.password.message}<br/></span>}                    
                    {errors.email && <span className={style.error}><br/>{errors.email.message}<br/></span>}                    
                </div>
                <div>
                    <button type='submit' className={style.singin_btn}>Forward</button> 
                </div>
                <div>
                    <Link to='/singup'>
                        <button type= 'submit' className={style.singin_back_btn}>Back</button> 
                    </Link>                      
                </div>  
            </form>
        </div>
     </div>
     
     
 );

}

export default Singup2