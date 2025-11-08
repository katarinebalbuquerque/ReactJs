import { useDispatch } from "react-redux";
import { DecrementQuantityProduct, IncrementQuantityProduct, RemoveProductCart } from "../../redux/cart/actions";

const ItemProductCart = ({ product }) => {

    const dispatch = useDispatch();

    const handleIncrementQuantityProductClick = () => {
        dispatch(IncrementQuantityProduct(product.id))
    }

    const handleDecrementQuantityProductClick = () => {
        dispatch(DecrementQuantityProduct(product.id))
    }

    const handleRemoveProductClick = () => {
        dispatch(RemoveProductCart(product.id))
    }

    return (
        <article className="item-product-cart">
            <section className="item-product-cart-sec-01">
                <img src={product.image} alt={product.name} />
                <div>
                    <h3>{product.name}</h3>
                    <h4>R$ {product.price.toFixed(2)}</h4>
                    <br />
                    <section className="quantity">
                        <h4><span onClick={handleDecrementQuantityProductClick}>-</span></h4>
                        <h4>{product.quantity} Kg</h4>
                        <h4><span onClick={handleIncrementQuantityProductClick}>+</span></h4>
                    </section>
                </div>
            </section>
            <section className="remover">
                <h3><span onClick={handleRemoveProductClick}>X</span></h3>
            </section>
        </article>
    )
}

export default ItemProductCart;