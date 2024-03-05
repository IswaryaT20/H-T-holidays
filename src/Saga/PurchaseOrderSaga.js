import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_PURCHASE_ORDER_API_CALL, GET_ALL_PURCHASE_ORDER_API_RESPONSE } from "../utils/Constant";
import { GetAllPurchaseOrder } from "../Reducer/Action/PurchaseOrderAction";


function* getAllPurchaseOrders() {
    const response = yield call(GetAllPurchaseOrder)

    if (response.status === 200) {
        if (response.data.code == 200) {
            yield put({type: GET_ALL_PURCHASE_ORDER_API_RESPONSE, payload: response.data})
        }
    }
}


function* PurchaseOrderSaga() {
    yield takeEvery(GET_ALL_PURCHASE_ORDER_API_CALL, getAllPurchaseOrders)
}

export default PurchaseOrderSaga;