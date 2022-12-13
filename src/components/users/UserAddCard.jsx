import style from './useraddcard.module.css';
import React from 'react';
import { AppContext } from '../../App';
import {addAvatarUser, addUser} from '../../api/requests';
import { Link } from 'react-router-dom';

const UserAddCard = () => { 

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
        
        const formData = new FormData();
        formData.append('file', context.image);
        formData.append('login', context.dataForm.login);

        await addUser({...context.dataForm}).then((response)=>{
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
                       <Link to='/usercard'>
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

export default UserAddCard