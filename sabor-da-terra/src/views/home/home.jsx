import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemProductHome from "../../components/item-product-home/itemProductHome";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/actions";
import { selectProductCout } from "../../redux/cart/cart-selectors";

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5173/products/products.json")
        .then(res=> setData(res.data.products))
        .catch(err=> console.log("Ocorreu algum erro!"))
    }, []);

    const {currentUser} = useSelector(rootReducer => rootReducer.UserReducer);

    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(logoutUser());
    }

    const countProduct = useSelector(selectProductCout);
    
    return (
        <>
            <Header>
                {
                    currentUser ? <h4 onClick={handleLogoutClick}>Sair</h4> : (<Link to="/login"><h4>Login</h4></Link>)
                } 
                {
                    currentUser ? <><Link to="/cart"><h4>Carrinho <img src="http://localhost:5173/images/cart.png" alt="Cart"/> ( {countProduct} )</h4></Link><br/></> : ""
                }               
                {
                    currentUser ? <h4 className="login-name">Olá, {currentUser.name}!</h4> : ""
                }                
            </Header>
            <section id="content">
                <div className="container">
                    {
                        data.map(product => (
                            <ItemProductHome key={product.id} product={product} />
                        ))
                    }
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Home;