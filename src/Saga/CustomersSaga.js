import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_ALL_CUSTOMERS_API_CALL,
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
  CREATE_CUSTOMER_API_CALL,
  CREATE_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_API_CALL,
  SEARCH_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE
} from "../utils/Constant";
import {
  GetAllCustomersCall,
  CreateCustomerApiCall,
  SearchCustomerApiCall, 
} from "../Reducer/Action/CustomersActions";
import { SearchCustomersById } from "../Reducer/Action/UserAction";

function* getAllCustomersApiCall(data) {
  const response = yield call(GetAllCustomersCall, data.data);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: GET_ALL_CUSTOMERS_API_RESPONSE,
          payload: response.data.data,
        });
      } else {
        yield put({
          type: ERROR_MESSAGE,
          payload: { message: response.data.message },
        });
        alert(response.data.message);
      }
    } else {
      yield put({
        type: ERROR_MESSAGE,
        payload: { message: "try after some time" },
      });
    }
  } catch (error) {}
}

function* createCustomerAPICall(bodyData) {
  const response = yield call(CreateCustomerApiCall, bodyData.payload);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: CREATE_CUSTOMER_API_RESPONSE,
          payload: response.data.data,
        });
      } else {
        yield put({
          type: ERROR_MESSAGE,
          payload: { message: response.data.message },
        });
        alert(response.data.message);
      }
    } else {
      yield put({
        type: ERROR_MESSAGE,
        payload: { message: "try after some time" },
      });
    }
  } catch (error) {
    alert("Error: ", error);
  }
}

function* searchCustomerApiCall(bodyData) {
  const response = yield call(SearchCustomerApiCall, bodyData.payload)
    try {
      if (response.status === 200) {
        if (response.data.code === 200) {
          yield put({type: SEARCH_CUSTOMER_API_RESPONSE, payload: response.data.data})
        }
      }
    }
    catch(error) {

    }
}

function* searchCustomerByID(data) {
  const response = yield call(SearchCustomersById, data.data);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE, payload: response.data.data})
      }
    }
  }
  catch(error) {

  }
}

function* CustomersSaga() {
  yield takeEvery(GET_ALL_CUSTOMERS_API_CALL, getAllCustomersApiCall);
  yield takeEvery(CREATE_CUSTOMER_API_CALL, createCustomerAPICall);
  yield takeEvery(SEARCH_CUSTOMER_API_CALL, searchCustomerApiCall);
  yield takeEvery(SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, searchCustomerByID);
}

export default CustomersSaga;
