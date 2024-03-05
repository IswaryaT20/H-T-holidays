import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_API_CALL, LOGIN_API_RESPONSE, ERROR_TYPE, REGISTER_API_CALL, REGISTER_API_RESPONSE, ERROR_MESSAGE, GET_LOGGED_USER_DETAILS_API_CALL, GET_LOGGED_USER_DETAILS_RESPONSE } from "../utils/Constant";
import { Login, Register, GetLoggedUserDetails } from "../Reducer/Action/UserAction";


function* callLoginApi(bodyData) {
    const response = yield call(Login, bodyData.data)
    try {
        console.log(response)
        if (response.status === 200) {
            if (response.data.code === 401) {
                yield put({type: ERROR_TYPE, payload: response.data.message})
            }
            else if (response.data.code === 200) {
                yield put({type: LOGIN_API_RESPONSE, payload: response.data})
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
            yield put({type: REGISTER_API_RESPONSE, payload: response.data.data})
        }
        else if (response.data.code === 201) {
            yield put({type: ERROR_MESSAGE, payload: response.data.message})
        }
    }
}

function* getLoggedUserDetails(data) {
    const response = yield call(GetLoggedUserDetails, data.data.id)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_LOGGED_USER_DETAILS_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {

    }
}

function* LoginSaga() {
    yield takeEvery(LOGIN_API_CALL, callLoginApi)
    yield takeEvery(REGISTER_API_CALL, callRegisterApi)
    yield takeEvery(GET_LOGGED_USER_DETAILS_API_CALL, getLoggedUserDetails)
}

export default LoginSaga;