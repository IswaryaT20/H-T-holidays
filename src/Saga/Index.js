import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import CustomersSaga from "./CustomersSaga";
import MasterSaga from "./MasterSaga";


function* RootSaga() {
    yield all([
        LoginSaga(),
        CustomersSaga(),
        MasterSaga()
    ])
}

export default RootSaga;