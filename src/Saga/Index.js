import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";


function* RootSaga() {
    yield all([
        LoginSaga()
    ])
}

export default RootSaga;