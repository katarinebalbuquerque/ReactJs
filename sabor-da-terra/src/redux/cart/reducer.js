import CartActionTypes from "./action-types";

const initialState = {
    products: [],
}

const CartReducer = (state=initialState, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_PRODUCT: {

            const verificaProductCart = state.products.find(product => product.id === action.payload.id);

            if(verificaProductCart) {
                return {
                    ...state,
                    products: state.products.map(product=> 
                        product.id === action.payload.id ?
                        ({...product, quantity: product.quantity + 1}) : product 
                    )
                }
            }

            return {
                ...state, 
                products: [...state.products, {...action.payload, quantity: 1}]}
        }
        case CartActionTypes.INCREMENT_QUANTITY: {
            return {
                ...state, 
                products: state.products.map(product=> 
                    product.id === action.payload ? 
                    {...product, quantity: product.quantity + 1} : product)
            }
        }
        case CartActionTypes.DECREMENT_QUANTITY: {
            return {
                ...state, 
                products: state.products.map(product=> 
                    product.id === action.payload ? 
                    {...product, quantity: product.quantity - 1} : product)
                    .filter(product => product.quantity > 0)
            }
        }
        case CartActionTypes.REMOVE_PRODUCT: {
           return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }
        }
        default: {
            return state;
        }
    }
}

export default CartReducer;