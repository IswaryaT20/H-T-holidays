function* createCustomerAPICall(bodyData) {
  const response = yield call(CreateCustomerApiCall, bodyData.payload);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: CREATE_CUSTOMER_API_RESPONSE,
          payload: response.data.code,
        });
        alert("Successfully added customers");
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
      alert("try after some time");
    }
  } catch (error) {
    alert("Error: ", error);
  }
}

