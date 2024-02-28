import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_CUSTOMERS_API_CALL, GET_ALL_CUSTOMERS_API_RESPONSE, ERROR_MESSAGE } from "../utils/Constant";
import { GetAllCustomersCall } from "../Reducer/Action/CustomersActions";


function* getAllCustomersApiCall() {
    const resposne = yield call(GetAllCustomersCall)

    try {
        if (resposne.status === 200) {
            if (resposne.data.code === 200) {
                yield put({type: GET_ALL_CUSTOMERS_API_RESPONSE, payload: resposne.data.data})
            }
            else {
                yield put({type: ERROR_MESSAGE, payload: {message: resposne.data.message}})
            }
        }
    }
    catch(error) {

    }
}

function* CustomersSaga() {
    yield takeEvery(GET_ALL_CUSTOMERS_API_CALL, getAllCustomersApiCall)
}

export default CustomersSaga;