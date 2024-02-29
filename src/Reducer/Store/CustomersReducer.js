import {
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
} from "../../utils/Constant";

const INITIAL_STATE = {
  customersList: [],
  error: null,
};

const CustomersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_API_RESPONSE: {
      return { ...state, customersList: action.payload };
    }
    case ERROR_MESSAGE: {
      return { ...state, error: action.payload };
    }
  }
  return state;
};

export default CustomersReducer;
