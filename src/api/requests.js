import axios from 'axios';

const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        method :'POST',
        url : 'http://localhost:8080/main/api/authentication',
        data : authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:'http://localhost:8080/main/api',
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}
export const addAvatarUser=(authRequest)=>{
    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'enctype': "multipart/form-data",
            'Content-Type': false 
        },
        url: 'http://localhost:8080/main/api/postadmin/avatar',
        data: authRequest 
    })
} 

export const addUser=(authRequest)=>{   

    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'Content-Type': 'application/json' 
        },
        url: 'http://localhost:8080/main/api/postadmin',
        data: authRequest     
    })
}

export const UpdateUser=(authRequest)=>{   

    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'Content-Type': 'application/json' 
        },
        url: 'http://localhost:8080/main/api/update',
        data: authRequest     
    })
}

export const addProduct=(authRequest)=>{   

    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'Content-Type': 'application/json' 
        },
        url: 'http://localhost:8080/main/api/product/add',
        data: authRequest     
    })
}

export const addAvatarProduct=(authRequest)=>{
    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'enctype': "multipart/form-data",
            'Content-Type': false 
        },
        url: 'http://localhost:8080/main/api/product/avatar',
        data: authRequest 
    })
} 

export const addAvatarProvider=(authRequest)=>{
    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'enctype': "multipart/form-data",
            'Content-Type': false 
        },
        url: 'http://localhost:8080/main/api/provider/avatar',
        data: authRequest 
    })
} 

export const addProvider=(authRequest)=>{   

    return axios({
        method: 'POST',
        headers: { 
            'Authorization':'Bearer '+getToken(),
            'Content-Type': 'application/json' 
        },
        url: 'http://localhost:8080/main/api/provider/add',
        data: authRequest     
    })
}

export const updateProduct=(data)=>{
    return axios({
        method: 'POST',
        headers: {
            'Authorization':'Bearer '+getToken(),
            'Content-Type': 'application/json'             
        },
        url: 'http://localhost:8080/main/api/product/update',
        data: data         
    })
}