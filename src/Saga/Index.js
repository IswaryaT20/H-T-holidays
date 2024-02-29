import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import CustomersSaga from "./CustomersSaga";
import MasterSaga from "./MasterSaga";
import ProductSaga from "./ProductSaga";


function* RootSaga() {
    yield all([
        LoginSaga(),
        CustomersSaga(),
        MasterSaga(),
        ProductSaga()
    ])
}

export default RootSaga;