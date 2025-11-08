export const selectProductCout = (rootReducer) => {
    return rootReducer.CartReducer.products.reduce((acc, curr) => acc + curr.quantity,0);
}

export const selectProductTotalPrice = (rootReducer) => {
    return rootReducer.CartReducer.products.reduce((acc, curr) => acc + curr.price * curr.quantity,0);
}