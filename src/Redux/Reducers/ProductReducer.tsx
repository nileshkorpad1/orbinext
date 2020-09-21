const ProductReducer = (state = "", action: any) => {
    let newState = state;
    if (action.type === "Product") {
        newState = action.Product;
    }
    return newState;
};
export default ProductReducer;
