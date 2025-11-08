import CartActionTypes from "./action-types";

export const AddProductCart = (payload) => ({
    type: CartActionTypes.ADD_PRODUCT,
    payload,
})

export const IncrementQuantityProduct = (payload) => ({
    type: CartActionTypes.INCREMENT_QUANTITY,
    payload,
})

export const DecrementQuantityProduct = (payload) => ({
    type: CartActionTypes.DECREMENT_QUANTITY,
    payload,
})

export const RemoveProductCart = (payload) => ({
    type: CartActionTypes.REMOVE_PRODUCT,
    payload,
})