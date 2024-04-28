import Procductslist from "./components/Productslist";
import Navebar from "./components/Navebar";
import About from "./components/About";
import { Route, Routes} from "react-router-dom";
import ProductDatiels from "./components/ProductDatiels";
import Cart from "./components/Cart";
import { fetchdata } from "./rtk/Slices/productSlice";
import { useDispatch } from "react-redux";
//import {  db } from "./firebase-config";
import {  useEffect,useState } from "react";
//import {collection,getDocs} from "firebase/firestore"
import Login from "./components/Login";
import AddNewProduct from "./components/AddNewProduct";
import Delete from "./components/Delete";
import AdminPage from "./components/AdminPage";
import { HomePage } from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";
//import Swal from "sweetalert2"
function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        // استدعاء fetchdata عند تحميل التطبيق
        dispatch(fetchdata());
    }, [dispatch]);
const [isAuth,setAuth]=useState(localStorage.getItem("Auth"))

    return (<>
        <Navebar isAuth={isAuth} setAuth={setAuth}  />
        <Routes>
            <Route path="/"  element={<><HomePage isAuth={isAuth} /> </>} />
        <Route path = "/products"
        element = { <><Procductslist isAuth={isAuth} /></> }
            />
        <Route path="About" element = { <><About /> </> }/>
        <Route path="/product/:productId" element = { <><ProductDatiels /> </>}/>
        <Route path="cart" element={ <>  <Cart isAuth={isAuth}/></> } />
        <Route path="login" element={<><Login setAuth={setAuth}/></>} />
        <Route path="addNewProduct" element={<><AddNewProduct/></>} />
        <Route path="Delete" element={<><Delete/></>} />
        <Route path="admin" element={<><AdminPage/></>} />
        <Route path="Erorr-400" element={<><ErrorPage/></>} />
        </Routes>
     
        </>
    )
}
export default App;