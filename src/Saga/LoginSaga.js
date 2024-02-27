import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_API_CALL, LOGIN_API_RESPONSE, ERROR_TYPE, REGISTER_API_CALL, REGISTER_API_RESPONSE } from "../utils/Constant";
import { Login, Register } from "../Reducer/Action/UserAction";


function* callLoginApi(bodyData) {
    const response = yield call(Login, bodyData.data)
    try {
        console.log(response)
        if (response.status === 200) {
            if (response.data.code === 401) {
                yield put({type: ERROR_TYPE, payload: response.data.message})
            }
            else if (response.data.code === 200) {
                yield put({type: LOGIN_API_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {
        console.log("error")
    }
}

function* callRegisterApi(params) {
    const response = yield call(Register, params.data)
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: REGISTER_API_RESPONSE, payload: response.data})
        }
        else if (response.data.code === 201) {
            yield put({type: REGISTER_API_RESPONSE, payload: response.data})
        }
    }
}

function* LoginSaga() {
    yield takeEvery(LOGIN_API_CALL, callLoginApi)
    yield takeEvery(REGISTER_API_CALL, callRegisterApi)
}

export default LoginSaga;