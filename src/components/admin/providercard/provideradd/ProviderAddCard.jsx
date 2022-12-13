import style from './provideraddcard.module.css';
import React from 'react';
import { AppContext } from '../../../../App';
import { addAvatarProvider, addProvider} from '../../../../api/requests';
import { Link } from 'react-router-dom';

const ProviderAddCard = () => { 

    const context = React.useContext(AppContext);        
    

    const onClickBtn = (data) => {          
        onAddToServer({...context.dataForm});
        context.setErrorServer([]);             
        context.setDataFormProvider([]); 
        context.setImageProvider([]);
        context.setImageProviderUrl([]); 
        context.setIsImageProviderUrl(false);             
    }    

    const onAddToServer = async () => { 
        
        const formData = new FormData();
        formData.append('file', context.imageProvider);
        formData.append('login', context.dataFormProvider.login);

        await addProvider({...context.dataFormProvider}).then((response)=>{
            if(response.status === 200){                
                console.log("Наконецто добавились");
                context.setDataFormProvider([]);                                  
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

        addAvatarProvider(formData).then((response)=>{
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
                <p className={style.form_p}>Дoбавляем нового продавца</p>
                <img 
                    src={context.isImageProviderUrl ? context.imageProviderUrl : '/img/avatar.png'}
                    className={context.isImageProviderUrl ? style.user_avatar : style.avatar}
                />    
                <form onSubmit={onClickBtn} className={style.container_form}>
                    <input                      
                      id="login"
                      type="text"
                      placeholder={context.dataFormProvider.login}
                      name='login'
                      readOnly
                    />
                    <br/>                    
                    <input                        
                        id='email'
                        type="email"
                        placeholder={context.dataFormProvider.email}
                        name='email'
                        readOnly
                    />                    
                    <br/> 
                    {
                        context.dataFormProvider.hasPhone && (
                           <>
                           <br/> 
                           <input
                                
                                id='phone'
                                type="tel"
                                placeholder={context.dataFormProvider.phone}
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
                        placeholder={context.dataFormProvider.password}
                        name='password'
                        readOnly
                    />
                    <br/>                    
                    <br/>
                    <input                        
                        id='userrole'
                        type="userrole"
                        placeholder={context.dataFormProvider.userrole}
                        name='userrole'
                        readOnly
                    />                     
                    <br/>                    
                    <br/> 
                    <div className={style.all_btn}>
                       <Link to='/providercard'>
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

export default ProviderAddCard