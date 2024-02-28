import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_CUSTOMERS_API_CALL, GET_ALL_CUSTOMERS_API_RESPONSE, ERROR_MESSAGE, CREATE_CUSTOMER_API_CALL, CREATE_CUSTOMER_API_RESPONSE } from "../utils/Constant";
import { GetAllCustomersCall, CreateCustomerApiCall } from "../Reducer/Action/CustomersActions";


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

function* createCustomerAPICall(bodyData) {
    const response = yield call(CreateCustomerApiCall)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                
            }
        }
    }
    catch(error) {

    }
}

function* CustomersSaga() {
    yield takeEvery(GET_ALL_CUSTOMERS_API_CALL, getAllCustomersApiCall)
    yield takeEvery(CREATE_CUSTOMER_API_CALL, createCustomerAPICall)
}

export default CustomersSaga;