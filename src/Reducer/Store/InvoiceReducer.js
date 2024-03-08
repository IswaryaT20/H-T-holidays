import { GET_ALL_INVOICE_API_RESPONSE, RESET_INVOICE_ARRAY } from "../../utils/Constant";

const INITIAL_STATE = {
    listInvoice: [],
    paidAmount: 0,
    unpaidAmount: 0,
    totalAmount: 0,
    totalOrders:0
}

const InvoiceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_INVOICE_API_RESPONSE:
            return {...state, listInvoice: action.payload.data.listInvoice, paidAmount: action.payload.data.paidAmount, unpaidAmount: action.payload.data.unPaidAmount, totalAmount: action.payload.data.toalPurchaseOrderAmount, totalOrders: action.payload.data.totalOrder}
        
        case RESET_INVOICE_ARRAY:
            return {...state, listInvoice:[]}
        }
    return state;

}

export default InvoiceReducer;