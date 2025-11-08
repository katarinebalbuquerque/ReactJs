import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddProductCart } from "../../redux/cart/actions";
import { useState } from "react";

const ItemProductHome = ({product}) => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {currentUser} = useSelector(rootReducer => rootReducer.UserReducer);

    const handleAddItemProductClick = () => {
        if(currentUser) {            
            dispatch(AddProductCart(product));                       
        }
        else {
            navigate("/login");
        }
    }
    
    return (
        <article className="item-product-home">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>            
            <h4>R$ {product.price.toFixed(2)} Kg</h4>
            <br />
            <button type="button" onClick={handleAddItemProductClick}>Adicionar ao Carrinho</button>
        </article>
    )
}

export default ItemProductHome;