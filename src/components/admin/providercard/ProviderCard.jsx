import React from 'react';
import style from './providercard.module.css';
import axios from 'axios';
import { AppContext } from '../../../App';

const ProviderCard = (props) =>{

    const context = React.useContext(AppContext);
    const [avatar, setAvatar] = React.useState();

    const getToken=()=>{
      return localStorage.getItem('USER_KEY');
    }
    

    React.useEffect(()=>{        
         
        async function axiosFoto () {

           const path = await axios({
               methot: "GET",
               responseType: 'arraybuffer', 
               url: `http://localhost:8080/main/api/provider/image/get/${props.fileName}`, 
               headers:{
                'Authorization':'Bearer '+getToken(),         
               }
           }).then(res => {
           const blob = new Blob([res.data], {type: 'image/png'}) 
            const url = URL.createObjectURL(blob); 
            setAvatar(url);                       
           })
              
        }

      axiosFoto();    
       
    }, []);   

    const DeleteProvider = async () =>{
        let id = props.id;
        props.DeleteProvider({id});
        console.log('что-то происходит');
    }
    const EditProvider = () =>{
        console.log('кнопка EDIT сработала')
        context.setIsEditProvider(true);
        let id = props.id;
        let login = props.login;
        let email = props.email;
        let phone = props.phone;
        let role = props.role;
        let fileName = props.fileName;
        let url = avatar;
        context.setEditProvider({id, login, email, phone, role, fileName, url});
        console.log('отработало'); 
    }
    const InfoAboutProvider = () =>{

        if(context.isInfoProvider){
            context.setInfoProvider([]);
            context.setIsInfoProvider(false);
        } else {
            console.log('кнопка INFO сработала')
            context.setIsInfoProvider(true);
            let id = props.id;
            let login = props.login;
            let email = props.email;
            let phone = props.phone;
            let role = props.role;
            let fileName = props.fileName;
            let url = avatar;
            context.setInfoProvider({id, login, email, phone, role, fileName, url});
            console.log('отработало');   
        }


    }

    return(
        <div className={style.user_item}> 
            
             <img src={avatar ? avatar : '/img/avatar.png'} 
             className={avatar ? style.user_avatar : style.avatar}
             />              
                   
            <p className={style.login}>Login продавца: {props.login}</p>
            <p className={style.email}>Email продавца: {props.email}</p>
            <p className={style.phone}>Phone продавца: {props.phone}</p>
            <p className={style.role}>Role продавца: {props.role}</p>
            <p className={style.id}>ID продавца: {props.id}</p>
            <div className={style.button_all}>
               <button className={style.all_btn} onClick={EditProvider}>Edit</button>
               <button className={style.all_btn} onClick={DeleteProvider}>Delete</button>
               <button 
                className={context.isInfoProvider ? style.all_btn_on : style.all_btn} onClick={InfoAboutProvider}>Info</button>                
            </div>
            
        </div>
    );
}

export default ProviderCard