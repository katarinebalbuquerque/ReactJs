import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { logoutUser } from "../../redux/user/actions";
import { useNavigate, Link } from "react-router-dom";
import ItemProductCart from "../../components/item-product-cart/itemProductCart";
import { selectProductCout, selectProductTotalPrice } from "../../redux/cart/cart-selectors";

const Cart = () => {

    const navigate = useNavigate();

    const { currentUser } = useSelector(rootReducer => rootReducer.UserReducer);
    const { products } = useSelector(rootReducer => rootReducer.CartReducer);

    const countProduct = useSelector(selectProductCout);

    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(logoutUser());
        navigate("/")
    }

    const totalPrice = useSelector(selectProductTotalPrice);
    
    return (
        <>       
            <Header>
                <><Link to="/"><h4>Home</h4></Link><br/></>
                {
                    currentUser ? <h4 onClick={handleLogoutClick}>Sair</h4> : ""
                }                
                {
                    currentUser ? <h4 className="login-name">Olá, {currentUser.name}!</h4> : ""
                }
            </Header>
            <section id="cart-content">
                <div className="container">
                    <br /><br />
                    <h4 id="qtd-product">Quantidade de Produtos:  <strong>{countProduct}</strong></h4>
                    {
                        products.length === 0 ?
                            <article id="sem-product">
                                <br /><br />
                                <h3>Não há produtos no carrinho, selecione um produto!</h3>
                                <br /><br />
                                <img width="200" src="http://localhost:5173/images/vazio.png" alt="Vazio" />
                            </article>
                        :
                        products.map((product,index) => (
                            <ItemProductCart key={index} product={product} />
                        ))
                    }
                    <article id="total-price">
                        <h3>Total à pagar: <span>R$ {totalPrice.toFixed(2)}</span></h3>
                    </article>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Cart;