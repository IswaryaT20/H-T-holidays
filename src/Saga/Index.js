import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import CustomersSaga from "./CustomersSaga";
import MasterSaga from "./MasterSaga";
import ProductSaga from "./ProductSaga";
import PurchaseOrderSaga from "./PurchaseOrderSaga";
import InvoiceSaga from "./InvoiceSaga";


function* RootSaga() {
    yield all([
        LoginSaga(),
        CustomersSaga(),
        MasterSaga(),
        ProductSaga(),
        PurchaseOrderSaga(),
        InvoiceSaga()
    ])
}

export default RootSaga;