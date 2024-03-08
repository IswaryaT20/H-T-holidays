import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_INVOICE_API_CALL, GET_ALL_INVOICE_API_RESPONSE } from "../utils/Constant";
import { GetAllInvoiceRequest } from "../Reducer/Action/InvoiceAction";


function* getAllInvoiceApiCall() {
    const response = yield call(GetAllInvoiceRequest)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_INVOICE_API_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {

    }
}

function* InvoiceSaga() {
    yield takeEvery(GET_ALL_INVOICE_API_CALL, getAllInvoiceApiCall)
}

export default InvoiceSaga;