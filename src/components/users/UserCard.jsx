import React from 'react';
import style from './usercard.module.css';
import axios from 'axios';
import { AppContext } from '../../App';

const UserCard = (props) =>{

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
               url: `http://localhost:8080/main/api/postadmin/avatar/get/${props.fileName}`, 
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

    const DeleteUser = async () =>{
        let id = props.id;
        props.DeleteUser({id});
        console.log('что-то происходит');
    }
    const EditUser = () =>{
        console.log('кнопка сработала')
        context.setEdit(true);
        let id = props.id;
        let login = props.login;
        let email = props.email;
        let phone = props.phone;
        let role = props.role;
        let fileName = props.fileName;
        let url = avatar;
        context.setEditUser({id, login, email, phone, role, fileName, url});
        console.log('отработало');
  
    }

    return(
        <div className={style.user_item}> 
            
             <img src={avatar ? avatar : '/img/avatar.png'} 
             className={avatar ? style.user_avatar : style.avatar}
             />              
                   
            <p className={style.login}>Login пользователя: {props.login}</p>
            <p className={style.email}>Email пользователя: {props.email}</p>
            <p className={style.phone}>Phone пользователя: {props.phone}</p>
            <p className={style.role}>Role пользователя: {props.role}</p>
            <p className={style.id}>ID пользователя: {props.id}</p>
            <div className={style.button_all}>
               <button className={style.all_btn} onClick={EditUser}>Edit</button>
               <button className={style.all_btn} onClick={DeleteUser}>Delete</button>
               <button className={style.all_btn}>Info</button>                
            </div>
            
        </div>
    );
}

export default UserCard