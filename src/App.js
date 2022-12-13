import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Favorites from './components/favorites/Favorites';
import Home from './components/Home';
import Singup from './components/singup/Singup';
import Singup2 from './components/singup/Singup2';
import Singup3 from './components/singup/Singup3';
import Singin from './components/singin/Singin';
import UserAddCard from './components/users/UserAddCard';
import AddUser from './components/users/AddUser';
import UpdateUser from './components/users/editUser/UpdateUser';
import PanelAdmin from './components/admin/PanelAdmin';
import EditUser from './components/users/editUser/EditUser';
import ProductAddCard from './components/admin/productinfo/productadd/ProductAddCard';
import ProductAdd from './components/admin/productinfo/productadd/ProductAdd';
import ProviderInfo from './components/admin/providerinfo/ProviderInfo';
import ProviderAddCard from './components/admin/providercard/provideradd/ProviderAddCard';
import PanelProvider from './components/provider/panelprovider/PanelProvider';
import UpdateProduct from './components/provider/editproduct/UpdateProduct';
import EditProduct from './components/provider/editproduct/EditProduct';
import EditProvider from './components/admin/providercard/editProviders/EditProvider';



export const AppContext = React.createContext({});

function App() { 

  const [cartOpened, setCartOpened] = React.useState(false);
  const [accountOpened, setAccountOpened] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [accountItems, setAccountItems] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [search2, setSearch2] = React.useState('');
  const [search3, setSearch3] = React.useState('');
  const [search4, setSearch4] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dataForm, setDataForm] = React.useState([]);
  const [dataFormProduct, setDataFormProduct] = React.useState([]);
  const [isAuthUser, setAuthUser] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [isAllUsers, setAllUsers] = React.useState(false);
  const [isAddUser, setAddUser] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState([]);
  const [image, setImage] = React.useState();  
  const [imageUrl, setImageUrl] = React.useState();
  const [isImageUrl, setIsImageUrl] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState();
  const [isProductsBtn, setProductsBtn] = React.useState(false);
  const [isAllProducts, setAllProducts] = React.useState(false);
  const [isUsersBtn, setUsersBtn] = React.useState(false);
  const [isEditProduct, setIsEditProduct] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState();
  const [isAddProduct, setAddProduct] = React.useState(false);
  const [imageProduct, setImageProduct] = React.useState();
  const [imageProductUrl, setImageProductUrl] = React.useState();
  const [isImageProductUrl, setIsImageProductUrl] = React.useState(false);
 
  const [isProvidersBtn, setProvidersBtn] = React.useState(false);
  const [imageProvider, setImageProvider] = React.useState();
  const [imageProviderUrl, setImageProviderUrl] = React.useState();
  const [isImageProviderUrl, setIsImageProviderUrl] = React.useState(false);
  const [dataFormProvider, setDataFormProvider] = React.useState([]);
  const [isAddProvider, setAddProvider] = React.useState(false);
  const [isAllProviders, setAllProviders] = React.useState(false);
  const [editProvider, setEditProvider] = React.useState();   
  const [isEditProvider, setIsEditProvider] = React.useState(false);
  const [isInfoProvider, setIsInfoProvider] = React.useState(false); 
  const [infoProvider, setInfoProvider] = React.useState([]);

  const [isProviderAllProductsBtn, setIsProviderAllProductsBtn] = React.useState(false);
  const [isProviderAddProductsBtn, setIsProviderAddProductsBtn] = React.useState(false);
  
  const [isCartBtn, setIsCartBtn] = React.useState(false);
  const [isAccountBtn, setIsAccountBtn] = React.useState(false);

  const [filterDeviceBtn, setFilterDeviceBtn] = React.useState(false);
  const [isOrdersBtn, setIsOrdersBtn] = React.useState(false);
  const [isChangeStatus, setIsChangeStatus] = React.useState(false);
  const [infoCard, setInfoCard] = React.useState([]);
  const [isInfo, setIsInfo] = React.useState(false);


  React.useEffect(() => {   

    async function axiosData () {
      
//      const cartData = await axios.get('https://63500d6078563c1d82b78f08.mockapi.io/api/cart');
//      const productsData = await axios.get('https://63500d6078563c1d82b78f08.mockapi.io/api/products');
//      const cartData = await axios.get('http://localhost:8080/main/api/person/cart/');      

      const productsData = await axios.get('http://localhost:8080/main/api/products');
      if(localStorage.getItem('USER_ROLE') === 'USER'){
        const { data } = axios({
        method:'GET',
        url:'http://localhost:8080/cart',
        headers:{
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
        }
      }).then((response) =>{
        setCartItems(response.data);
      });
        
      }


     // const cartData = await axios.get('http://localhost:3001/cart');
     // const favoritesData = await axios.get('http://localhost:3001/favorites');
     // const productsData = await axios.get('http://localhost:3001/products');
      setProducts(productsData.data);
//      setCartItems(cartData.data);
     
      

      setDataForm([]);
      setDataFormProduct([]);
      console.log(localStorage.getItem('USER_KEY'));
    } 
    setLoading(true);
    axiosData();
    setLoading(false);
  }, []);

  const getToken=()=>{
    return localStorage.getItem('USER_KEY');
  }

  const cartRemoveItem = (obj) => {
    setCartItems((prev) => prev.filter(item => item.id !== obj.id));
    axios({
      method:'GET',
      url:`http://localhost:8080/cart/delete/${obj.id}`,
      headers:{
              'Authorization':'Bearer '+getToken()
      }
    }) 
//    axios.delete(`https://63500d6078563c1d82b78f08.mockapi.io/api/cart/${obj.id}`);    
  }  

  const itemAdded = (obj) => {
    if(cartItems){
      return cartItems.some((objCart) => objCart.id === obj.id);
    } else {
      return false;
    }   
    
  }

  const setValues = (values) =>{
    setDataForm((prevData) => ({...prevData, ...values}))
  }
  const setValuesProduct = (values) =>{
    setDataFormProduct((prevData) => ({...prevData, ...values}))
  }
  const setValuesProvider = (values) =>{
    setDataFormProvider((prevData) => ({...prevData, ...values}))
  }

  return (    
    <AppContext.Provider value={{ 
      products, cartItems, favorites, loading, setLoading,
      setCartItems, setProducts, setFavorites, accountItems, setAccountItems,
      itemAdded, accountOpened, setAccountOpened,
      dataForm, setDataForm, setValues, dataFormProduct, setValuesProduct, setDataFormProduct,
      isAuthUser, setAuthUser, role, setRole,
      isAllUsers, setAllUsers, isAddUser, setAddUser,
      errorServer, setErrorServer,
      image, setImage, imageUrl, setImageUrl, isImageUrl, setIsImageUrl,
      isEdit, setEdit, editUser, setEditUser, isAllProducts, setAllProducts,
      isProductsBtn, setProductsBtn, isUsersBtn, setUsersBtn,
      isEditProduct, setIsEditProduct, editProduct, setEditProduct,
      isAddProduct, setAddProduct, imageProduct, setImageProduct,
      imageProductUrl, setImageProductUrl, isImageProductUrl, setIsImageProductUrl,
      isProvidersBtn, setProvidersBtn, editProvider, setEditProvider,
      imageProvider, setImageProvider, imageProviderUrl, setImageProviderUrl,
      isImageProviderUrl, setIsImageProviderUrl,dataFormProvider, setDataFormProvider, 
      setValuesProvider, isAddProvider, setAddProvider,isAllProviders, setAllProviders,
      isEditProvider, setIsEditProvider, isInfoProvider, setIsInfoProvider,
      infoProvider, setInfoProvider, isProviderAllProductsBtn, setIsProviderAllProductsBtn,
      isProviderAddProductsBtn, setIsProviderAddProductsBtn, isCartBtn, setIsCartBtn,
      isAccountBtn, setIsAccountBtn, cartOpened, setCartOpened, filterDeviceBtn, setFilterDeviceBtn,
      isOrdersBtn, setIsOrdersBtn, isChangeStatus, setIsChangeStatus, infoCard, setInfoCard,
      isInfo, setIsInfo     

    }}>
      <div className='app'>        
        <Header 
            openCart={() => setCartOpened(true)}
            openAccount={()=>setAccountOpened(true)}
            cartItems={cartItems}
            accountItems={accountItems}
        />
        <Routes>
          <Route path="/favorites" element={
              <Favorites />
            }            
            />
          <Route path="/singup" element={
              <Singup />
            }
            />
          <Route path="/singupsteptwo" element={
              <Singup2 />
            }
            />
          <Route path="/singupresult" element={
              <Singup3 />
            }
            />
          <Route path='/singin' element={
            <Singin />
            } 
            />          
          <Route path='/useraddcard' element={                       
            <UserAddCard />            
            }
            />
          <Route path='/usercard' element={
            <AddUser />
            }
            /> 
          <Route path='/updateuser' element={
            <UpdateUser/>
            }  
            />
          <Route path='/paneladmin' element={
            <PanelAdmin/>
            }  
            />  
          <Route path='/edituser' element={
            <EditUser/>
            }  
            />
          <Route path='/productaddcard' element={
            <ProductAddCard />
            }
            /> 
          <Route path='/productadd' element={
            <ProductAdd />
            } 
            /> 
          <Route path='/providercard' element={
            <ProviderInfo />
            }
            />
          <Route path='/provideraddcard' element={
            <ProviderAddCard />
            }
            />
          <Route path='/panelprovider' element={
            <PanelProvider />
            }  
            />
          <Route path='/productupdatecard' element={
            <UpdateProduct />
            }  
            /> 
          <Route path='/editproduct' element={
            <EditProduct />
            }  
            />
          <Route path='/editprovider' element={
            <EditProvider/>
            }
            />               
          <Route path="/" element={
            <Home 
              items={products}
              cartItems={cartItems}
              favorites={favorites}
              setCartItems={setCartItems}
              setFavorites={setFavorites}
              setSearch={setSearch}
              search={search}
              search2={search2}
              setSearch2={setSearch2}
              search3={search3}
              setSearch3={setSearch3}
              search4={search4}
              setSearch4={setSearch4}                            
              loading={loading}                            
              closeCart={() => setCartOpened(false)}
              closeAccount={()=> setAccountOpened(false)}
              cartRemoveItem={cartRemoveItem}
              totalPrice={
                cartItems ? 
                  cartItems.reduce((sum, objPrice) => sum + Number(objPrice.price), 0)
                :
                0                              
              }              
            />            
          }
          />        
        </Routes>        
        <Footer />
    </div>
    </AppContext.Provider>    
  );
}

export default App;