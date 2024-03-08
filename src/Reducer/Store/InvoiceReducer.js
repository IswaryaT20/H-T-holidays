import {
  GET_ALL_INVOICE_API_RESPONSE,
  RESET_INVOICE_ARRAY,
  GENERATE_INVOICE_PDF_API_CALL,
  GENERATE_INVOICE_PDF_API_RESPONSE
} from "../../utils/Constant";
const INITIAL_STATE = {
  invoiceList: [],
  paidAmount: 0,
  unpaidAmount: 0,
  totalAmount: 0,
  totalOrders: 0,
  fileurl: ''
};

const InvoiceReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GET_ALL_INVOICE_API_RESPONSE:
      return { ...state, invoiceList: action.payload, };
    case RESET_INVOICE_ARRAY:
      return { ...state, listInvoice: [] };
    case GENERATE_INVOICE_PDF_API_RESPONSE: {
        return {...state, fileurl: action.payload}
    }
  }
  return state;
};

export default InvoiceReducer;
