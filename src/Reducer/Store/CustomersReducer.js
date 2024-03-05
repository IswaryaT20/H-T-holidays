import {
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
  SEARCH_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE
} from "../../utils/Constant";

const INITIAL_STATE = {
  customersList: [],
  error: null,
  searchList: [],
  selectedCustomerDetails: null
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

    case SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE: {
      return {...state, selectedCustomerDetails: action.payload}
    }
  }
  return state;
};

export default CustomersReducer;
