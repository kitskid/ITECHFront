import axios from "axios";

const getToken=()=>{
        return localStorage.getItem('USER_KEY');
}
const getId=()=>{
    return localStorage.getItem('ID');
}    

class ProductsService {  
    

    getProductsAll(){
        return axios({
            method:'GET',
            url:'http://localhost:8080/main/api/products',
//            headers:{
//                'Authorization':'Bearer '+getToken()
//            }
        })
    }

    getCategories(){
        return axios({
            method:'GET',
            url:'http://localhost:8080/main/api/product/category',
            headers:{
                'Authorization':'Bearer '+getToken()
            }
        })
    }

    getCategoriesProvider(){
        return axios({
            method:'GET',
            url:'http://localhost:8080/main/api/product/category/provider',
            headers:{
                'Authorization':'Bearer '+getToken()
            }
        })
    }    

    getProductsAllProvider(){
        return axios({
            method:'GET',
            url:`http://localhost:8080/main/api/products/${getId()}`,
            headers:{
                'Authorization':'Bearer '+getToken()
            }            
        })
    }
    getStatus(){
        return axios({
            method:'GET',
            url:`http://localhost:8080/admin/status`,
            headers:{
                'Authorization':'Bearer '+getToken()
            }            
        })
    }
}

export default new ProductsService();