import { GET_ALL_INVOICE_API_RESPONSE } from "../../utils/Constant"
const INITIAL_STATE = {
    invoiceList: []
}


const InvoiceReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case GET_ALL_INVOICE_API_RESPONSE:
            return {...state, invoiceList: action.payload}
    }

    return state;
}

export default InvoiceReducer;