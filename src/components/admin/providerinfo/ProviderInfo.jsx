import React from "react";
import ProvidersService from "../../../services/ProvidersService";
import ProviderCard from "../providercard/ProviderCard";
import style from "./providerinfo.module.css";
import axios from "axios";

const ProviderInfo = () =>{

    const [providers, setProviders] = React.useState([]);

    React.useEffect(()=>{ 
        async function axiosFoto () {
            
                ProvidersService.getProviders().then((response) => {
                    setProviders(response.data)
                    console.log(response.data) 
                 });
           
        }
        axiosFoto();
    }, []);



    const DeleteProvider = async (obj) =>{
        const del = await axios({
            method: 'DELETE',
            url: `http://localhost:8080/main/api/provider/delete/${obj.id}`,
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY'),         
               }
        })
        console.log("Пробуем удалить продавца")
        setProviders(prev=> prev.filter(provider => provider.id !== obj.id));

    }


    return(
        <div className={style.providers}>                                                    
                {
                    providers.map(provider =>{
                    return(    
                       <ProviderCard
                            key={provider.id}                            
                            DeleteProvider={(obj) =>{
                                DeleteProvider(obj);
                            }}
                        {...provider}
                       />
                    )                           
                    })
                }                    
        </div>
    );
}
export default ProviderInfo;