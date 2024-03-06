import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_PURCHASE_ORDER_API_CALL, GET_ALL_PURCHASE_ORDER_API_RESPONSE, CREATE_PURCHASE_ORDER_API_CALL, CREATE_PURCHASE_ORDER_API_RESPONSE } from "../utils/Constant";
import { GetAllPurchaseOrder, CreatePurchaseOrder } from "../Reducer/Action/PurchaseOrderAction";


function* getAllPurchaseOrders() {
    const response = yield call(GetAllPurchaseOrder)

    if (response.status === 200) {
        if (response.data.code == 200) {
            yield put({type: GET_ALL_PURCHASE_ORDER_API_RESPONSE, payload: response.data})
        }
    }
}

function* createPurchaseOrder(data) {
    const response = yield call(CreatePurchaseOrder, data.data);
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: CREATE_PURCHASE_ORDER_API_RESPONSE})
        }
    }
}


function* PurchaseOrderSaga() {
    yield takeEvery(GET_ALL_PURCHASE_ORDER_API_CALL, getAllPurchaseOrders)
    yield takeEvery(CREATE_PURCHASE_ORDER_API_CALL, createPurchaseOrder)

}

export default PurchaseOrderSaga;