import axios from "axios";
import React from 'react';
import Card from "./card/Card";
import style from './products.module.css';
import { AppContext } from "../../App";
import ProductsService from "../../services/ProductsService";

const Products = (props) =>{

  const context = React.useContext(AppContext);
  const [productsAll, setProductsAll] = React.useState([]);
  const [direction, setDirection] = React.useState(false);

  React.useEffect(()=>{ 
    async function axiosProductsAll () {
        
            ProductsService.getProductsAll().then((response) => {
                setProductsAll(response.data)
                console.log(response.data) 
             });
       
    }
    axiosProductsAll();
}, []);

const getToken=()=>{
  return localStorage.getItem('USER_KEY');
}

    const onAddCart = async (obj) => {

       let findObj = false;
      if (context.cartItems !== []) {
        findObj = context.cartItems.find(objFind => objFind.id === obj.id);
      } 
      console.log(findObj);
      if(findObj){
//        const { data } = await axios.delete(`https://63500d6078563c1d82b78f08.mockapi.io/api/cart/${findObj.id}`);
        const { data } = await axios({
          method:'GET',
          url:`http://localhost:8080/cart/delete/${findObj.id}`,
          headers:{
                  'Authorization':'Bearer '+getToken()
          }
        }) 
        context.setCartItems(prev=> prev.filter(cartItem => cartItem.id !== findObj.id));
      } else {
//        const { data } = await axios.post('https://63500d6078563c1d82b78f08.mockapi.io/api/cart', obj);
        const { data } = await axios({
          method:'GET',
          url:`http://localhost:8080/cart/add/${obj.id}`,
          headers:{
                  'Authorization':'Bearer '+getToken()
          }          
        })
        context.setCartItems([...context.cartItems, obj]);
      }      
    }
    const Direction = ()=>{
      if(direction){
        setDirection(false)
      } else {
        setDirection(true);
      }
    }


    const onSearchInput = (inputValue) => {
      props.setSearch(inputValue.target.value)
    }
    const onSearchInput2 = (inputValue) => {
      props.setSearch2(inputValue.target.value)
    }
    const onSearchInput3 = (inputValue) => {
      props.setSearch3(inputValue.target.value)
    }
    const onSearchInput4 = (inputValue) => {
      props.setSearch4(inputValue.target.value)
    }            

    const renderCart = () => {
      let nameCategory = props.nameCategory;
      let price = String(props.search2);      
      let filterItem = productsAll.sort((a, b) => a.price > b.price ? (direction ? -1 : 1) : (direction ? 1 : -1));                                  
     
      filterItem = filterItem.filter((c) => String(c.price).includes(price));
      filterItem = filterItem.filter((product) => product.price >= Number(props.search3));
      if(props.search4 !== ""){
        filterItem = filterItem.filter((product) => product.price <= Number(props.search4));
      }
      

      console.log(filterItem);
        if(typeof nameCategory == "undefined"){
          filterItem = filterItem
                .filter((product) => product.name.toLowerCase().includes(props.search.toLowerCase()));   
        } else {
          nameCategory = nameCategory.toString();
          if(nameCategory === "All"){
              filterItem = filterItem.filter((product) =>
              product.name.toLowerCase().includes(props.search.toLowerCase()));
          } else {
              filterItem = filterItem
                  .filter((product) => product.name.toLowerCase().includes(props.search.toLowerCase()))
                  .filter((product) => product.nameCategory.includes(nameCategory));                  
          } 
        }          


 

      return(props.loading ? [...Array(6)] : filterItem).map((obj) => {
              return(
                <Card                   
                  key={obj.id}                  
                  {...obj}                 
                  isloading={props.loading}
                  onClickPlus={
                    (cartObj) => {                    
                    onAddCart(cartObj);
                  }} 
                  productsAll={productsAll} 
                  setChange={props.setChange}
                  change={props.change}            
                />
              )
            })
      
    }
    return(
        <div className={style.product_section}>
        <div className={style.search}>
          
            <h3>{props.search ? 'Поиск по запросу: ' + props.search : props.nameCategory}</h3>
            <div className={style.search_block}>
                <img src="/img/search.png" alt="Поиск" />
                <input onChange={onSearchInput} placeholder="Поиск по товарам: " />
            </div>
        </div>
        {context.filterDeviceBtn ?
          <div>
              <div className={style.search}>
                <span></span>
                <div className={style.search_block}>
                    <img src="/img/search.png" alt="Поиск" />
                    <input onChange={onSearchInput2} placeholder="Поиск по цене: " />
                </div>          
              </div>
              <div className={style.search}>
                <span></span>
                <div className={style.search_block}>
                    <img src="/img/search.png" alt="Поиск" />
                    <input onChange={onSearchInput3} placeholder="от" />
                </div>          
              </div>
              <div className={style.search}>
                <span></span>
                <div className={style.search_block}>
                    <img src="/img/search.png" alt="Поиск" />
                    <input onChange={onSearchInput4} placeholder="до" />
                </div >          
              </div>
              <div className={style.search}>
                <span></span>
                <button className={style.filter_btn} onClick={Direction}>
                  {direction ? 'По убыванию' : 'По возрастанию'}</button>          
              </div>          
          </div>         
        :
        <></>
        }


        
        <div className={style.product}>

          {
            renderCart()
          }          

        </div>
      </div> 
    );
}

export default Products;