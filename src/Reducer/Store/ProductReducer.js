import { GET_ALL_PRODUCTS_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
    products: []
}

const ProductReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS_RESPONSE:
            return {...state, products: action.payload}
    }
    return state
}

export default ProductReducer;