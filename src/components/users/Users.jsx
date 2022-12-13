import React from "react";
import UserService from "../../services/UserService";
import UserCard from "./UserCard";
import style from "./users.module.css";
import axios from "axios";

const Users = () =>{

    const [users, setUsers] = React.useState([]);

    React.useEffect(()=>{ 
        async function axiosFoto () {
            
                UserService.getUsers().then((response) => {
                    setUsers(response.data)
                    console.log(response.data) 
                 });
           
        }
        axiosFoto();
    }, []);



    const DeleteUser = async (obj) =>{
        const del = await axios({
            method: 'DELETE',
            url: `http://localhost:8080/main/api/delete/${obj.id}`,
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY'),         
               }
        })
        console.log("Пробуем удалить юзера")
        setUsers(prev=> prev.filter(user => user.id !== obj.id));

    }


    return(
        <div className={style.users}>                                                    
                {
                    users.map(user =>{
                    return(    
                       <UserCard
                            key={user.id}                            
                            DeleteUser={(obj) =>{
                                DeleteUser(obj);
                            }}
                        {...user}
                       />
                    )                           
                    })
                }             
                      
        </div>
    );
}
export default Users;