import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import CustomersSaga from "./CustomersSaga";


function* RootSaga() {
    yield all([
        LoginSaga(),
        CustomersSaga()
    ])
}

export default RootSaga;