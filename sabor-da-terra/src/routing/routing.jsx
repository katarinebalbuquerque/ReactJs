import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../views/home/home";
import Cart from "../views/cart/cart";
import Login from '../views/login/login';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;