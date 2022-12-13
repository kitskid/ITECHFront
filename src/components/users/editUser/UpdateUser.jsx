import style from './updateuser.module.css';
import React from 'react';
import { AppContext } from '../../../App';
import { addAvatarUser} from '../../../api/requests';
    
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => { 

    const context = React.useContext(AppContext);        
    

    const onClickBtn = (data) => {          
        onAddToServer({...context.dataForm});
        context.setErrorServer([]);             
        context.setDataForm([]); 
        context.setImage([]);
        context.setImageUrl([]); 
        context.setIsImageUrl(false);             
    }    

    const onAddToServer = async () => { 
        if(context.isImageUrl) {
           console.log(context.imageUrl);
           
           const formData = new FormData();
           formData.append('file', context.image);
           formData.append('login', context.dataForm.login);
           
        //   const formDataUser =new FormData();
        //   formDataUser.append('id', context.editUser.id);
        //   formDataUser.append('login', context.dataForm.login);
        //   formDataUser.append('email', context.dataForm.email);
        //   formDataUser.append('phone', context.dataForm.phone);
        //   formDataUser.append('password', context.dataForm.password);
        //   formDataUser.append('userrole', context.dataForm.userrole) 

           const UserJson = JSON.stringify({'id': context.editUser.id, 'login': context.dataForm.login,'email': context.dataForm.email,
            'phone': context.dataForm.phone, 'password': context.dataForm.password, 'role': context.dataForm.userrole});

        const res = axios.post('http://localhost:8080/main/api/update', UserJson);

        //.then((response)=>{
        //    if(response.status === 200){                
        //        console.log("Наконецто добавились");
        //        context.setDataForm([]);                                  
        //    }
        //    else if(response.status===406){
        //        console.log('статус показывает')
        //    } else{
        //        console.log('ничего не показывает')
       //     }
        //}).catch((err)=>{
        //    if(err && err.response){
        //        console.log(err.response.data.login);
        //        context.setErrorServer(err.response.data);                
        //    }
        //})


        addAvatarUser(formData).then((response)=>{
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

        } else {
           console.log('Собираем посылку ' + context.editUser.id + 'логин пользователя: ' + context.dataForm.login)
        //   const formDataUser =new FormData();
        //   formDataUser.append('id', context.editUser.id);
        //   formDataUser.append('login', context.dataForm.login);
        //   formDataUser.append('email', context.dataForm.email);
        //   formDataUser.append('phone', context.dataForm.phone);
        //   formDataUser.append('password', context.dataForm.password);
        //   formDataUser.append('userrole', context.dataForm.userrole) 

           const UserJson = JSON.stringify({'id': context.editUser.id, 'login': context.dataForm.login,'email': context.dataForm.email,
            'phone': context.dataForm.phone, 'password': context.dataForm.password, 'role': context.dataForm.userrole});
                 
            const res = axios({
                method: 'POST',
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('USER_KEY'),
                    'Content-Type': 'application/json' 
                },
                url:'http://localhost:8080/main/api/update',
                data: UserJson
            }).then((response)=>{
                if(response.status === 200){                
                    console.log("Наконецто добавились");
                    context.setDataForm([]);                                  
                }
                else if(response.status===406){
                    console.log('статус показывает')
                } else{
                    console.log('ничего не показывает')
                }
            }).catch((err)=>{
                if(err && err.response){
                    console.log(err.response.data.login);
                    context.setErrorServer(err.response.data);                
                }
            })
        }      
   
    }   
     

    return(       
        
        <div className={style.adduser_page}>            
           <div className={style.container}>
           <span></span>
           <div className={style.form_div}>
                <p className={style.form_p}>Дoбавляем нового пользователя</p>
                <img 
                    src={context.isImageUrl ? context.imageUrl : context.editUser.url || '/img/avatar.png'}
                    className={context.isImageUrl ? style.user_avatar : style.avatar}
                />    
                <form onSubmit={onClickBtn} className={style.container_form}>
                    <input                      
                      id="login"
                      type="text"
                      placeholder={context.dataForm.login}
                      name='login'
                      readOnly
                    />
                    <br/>                    
                    <input                        
                        id='email'
                        type="email"
                        placeholder={context.dataForm.email}
                        name='email'
                        readOnly
                    />                    
                    <br/> 
                    {
                        context.dataForm.hasPhone && (
                           <>
                           <br/> 
                           <input
                                
                                id='phone'
                                type="tel"
                                placeholder={context.dataForm.phone}
                                name='phone'                                
                                readOnly
                            />
                           </>    
                        )
                    }
                    <br/>
                    <input                        
                        id='password'
                        type="password"
                        placeholder={context.dataForm.password}
                        name='password'
                        readOnly
                    />
                    <br/>                    
                    <br/>
                    <input                        
                        id='userrole'
                        type="userrole"
                        placeholder={context.dataForm.userrole}
                        name='userrole'
                        readOnly
                    />                     
                    <br/>                    
                    <br/> 
                    <div className={style.all_btn}>
                       <Link to='/edituser'>
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

export default UpdateUser