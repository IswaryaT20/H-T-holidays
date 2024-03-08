import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_INVOICE_API_CALL, GET_ALL_INVOICE_API_RESPONSE, CREATE_INVOICE_API_CALL, CREATE_INVOICE_API_RESPONSE } from "../utils/Constant";
import {GetAllInvoices, CreateInvoice} from "../Reducer/Action/InvoiceAction";


function* getAllInvoices() {
    const response = yield call(GetAllInvoices)

    if (response.status === 200){
        if (response.data.code === 200){
            yield put({type:GET_ALL_INVOICE_API_RESPONSE, payload: response.data})
        }
    }
}

function* createInvoice(data) {
    const response = yield call(CreateInvoice, data.data);
    if(response.status === 200) {
        if (response.data.code === 200){
            yield put({type:CREATE_INVOICE_API_RESPONSE})
        }
    }
       
}

function* InvoiceSaga() {
    yield takeEvery(GET_ALL_INVOICE_API_CALL, getAllInvoices)
    yield takeEvery(CREATE_INVOICE_API_CALL, createInvoice)
}

export default InvoiceSaga;