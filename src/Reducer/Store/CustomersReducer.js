import {
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
  SEARCH_CUSTOMER_API_RESPONSE
} from "../../utils/Constant";

const INITIAL_STATE = {
  customersList: [],
  error: null,
  searchList: []
};

const CustomersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_API_RESPONSE: {
      return { ...state, customersList: action.payload };
    }
    case ERROR_MESSAGE: {
      return { ...state, error: action.payload };
    }

    case SEARCH_CUSTOMER_API_RESPONSE: {
      return {...state, searchList: action.payload}
    }
  }
  return state;
};

export default CustomersReducer;
