import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_PRODUCTS_API_CALL, GET_ALL_PRODUCTS_RESPONSE, ERROR_MESSAGE } from "../utils/Constant";
import { GetAllProducts } from "../Reducer/Action/ProductAction";

function* getAllProducts() {
    const response = yield call(GetAllProducts)

    try {   
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_PRODUCTS_RESPONSE, payload: response.data.data})
            }
            else {
                yield put({type: ERROR_MESSAGE, payload: {message: response.data.message}}) 
            }
        }
    }
    catch(error) {

    }
}


function* ProductSaga() {
    yield takeEvery(GET_ALL_PRODUCTS_API_CALL, getAllProducts)
}

export default ProductSaga;