import axios from "axios";

const getToken=()=>{
        return localStorage.getItem('USER_KEY');
    }
const getLogin=()=>{
    return localStorage.getItem('LOGIN');
}    

class ProvidersService {  
    

    getProviders(){
        return axios({
            method:'GET',
            url:'http://localhost:8080/main/api/providers',
            headers:{
                'Authorization':'Bearer '+getToken()
            }
        })
    }
    getIdByLogin(login){
        return axios({
            method: 'GET',
            url:`http://localhost:8080/main/api/providers/${login}`,
            headers:{
                'Authorization':'Bearer '+getToken()
            }            
        })
    }
}

export default new ProvidersService();