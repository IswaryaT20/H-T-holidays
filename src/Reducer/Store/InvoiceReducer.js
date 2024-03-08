import {
  GET_ALL_INVOICE_API_RESPONSE,
  RESET_INVOICE_ARRAY,
} from "../../utils/Constant";
const INITIAL_STATE = {
  invoiceList: [],
  paidAmount: 0,
  unpaidAmount: 0,
  totalAmount: 0,
  totalOrders: 0,
};

const InvoiceReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GET_ALL_INVOICE_API_RESPONSE:
      return { ...state, invoiceList: action.payload, };
    case RESET_INVOICE_ARRAY:
      return { ...state, listInvoice: [] };
  }
  return state;
};

export default InvoiceReducer;
