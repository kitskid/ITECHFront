import axios from "axios";

const getToken=()=>{
        return localStorage.getItem('USER_KEY');
    }

class UserService {  
    

    getUsers(){
        return axios({
            method:'GET',
            url:'http://localhost:8080/main/api',
            headers:{
                'Authorization':'Bearer '+getToken()
            }
        })
    }
}

export default new UserService();