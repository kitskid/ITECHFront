import React from 'react';
import style from './singin.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import {useState} from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../../redux/authActions';
import {userLogin} from '../../api/requests'; 
import ProvidersService from '../../services/ProvidersService';
import axios from 'axios';


const Singin = ({loading,error,...props}) => { 

    const context = React.useContext(AppContext); 
     
    
    const [values, setValues] = useState({
        userName: '',
        password: ''
        });

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }} = useForm({
        
        defaultValues: {
            login: context.dataForm.login,                      
        }
    });
        

    const handleSubmit2 = () => {
        //evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response)=>{

            console.log("response",response);
            if(response.status===200){
                
                props.setUser(response.data);                
                console.log("Наконецто авторизовались");
                if(localStorage.getItem('USER_KEY') !=null){
                   context.setAuthUser(true); 
                   localStorage.setItem('AUTH', 'AUTH'); 
                   localStorage.setItem('LOGIN', response.data.login); 
                   console.log(localStorage.getItem('LOGIN'));                                       
                }                
                if (response.data.role === '[ROLE_ADMIN]'){                   
                   context.setRole('ADMIN');
                   localStorage.setItem('USER_ROLE', 'ADMIN');                                       
                } 
                if (response.data.role === '[ROLE_USER]'){                   
                    context.setRole('USER');
                    localStorage.setItem('USER_ROLE', 'USER');
                    const { data } = axios({
                        method:'GET',
                        url:'http://localhost:8080/cart',
                        headers:{
                                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
                        }
                      }).then((response) => {
                        context.setCartItems(response.data);
                        console.log(response.data); 
                      })                    
                    
                    console.log(context.cartItems);                                          
                } 
                if (response.data.role === '[ROLE_PROVIDER]'){                   
                    context.setRole('PROVIDER');
                    localStorage.setItem('USER_ROLE', 'PROVIDER'); 

                    ProvidersService.getIdByLogin(response.data.login).then((response) => {
                        localStorage.setItem("ID", response.data.id);
                        console.log(response.data.id)
                    });                                       
                }
                              

                navigate('/');
            }
            else{
               props.loginFailure('Something Wrong!Please Try Again видимо не статус 200'); 
            }


        }).catch((err)=>{
            console.log(err);
            if(err && err.response){
            
            switch(err.response.status){
                case 401:
                    console.log("401 status");
                    props.loginFailure("Authentication Failed.Bad Credentials");
                    break;
                default:
                    props.loginFailure('Something Wrong!Please Try Again '); 

            }

            }
            else{
                props.loginFailure('Something Wrong!Please Try Again во где аж');
            }            

        });       

        
    }

    //эта функция работает- иначе бы пароль отправлялся н верно
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };

    return(
        <div className={style.singin_page}>
           <div className={style.container}>
                <p className={style.login}>LOGIN</p>                
                <form onSubmit={handleSubmit(handleSubmit2)} className={style.container_form}>
                    <div>
                        <input
                        {...register('userName', {
                            required: {
                                value: true,
                                message: 'Поле обязательно для заполнения'
                            },
                            pattern: {
                                value: /^([^0-9]*)$/,
                                message: 'В имени должны быть только буквы'
                            }
                        })}
                        id="userName"
                        type="text"
                        placeholder='login'
                        name='userName'
                        value={values.userName}
                        onChange={handleChange}
                        /><br/>
                        {errors.userName && <span className={style.error}>{errors.userName.message}<br/></span>}                  
                    
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
                            className={style.pass}
                            value={values.password}
                            onChange={handleChange}
                        /><br/>
                        {errors.password && <span className={style.error}>{errors.password.message}<br/></span>}
                    </div>
                    <div>
                        <button type='submit' className={style.singin_btn}>Send</button>            
                        { 
                         error && <div className={style.error_sys}> {error} </div>
                        }                        
                    </div>        
                </form>
           </div>
        </div>
        
        
    );
}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error,
        isAuth: auth.isAuth
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Singin);