import { GET_ALL_PURCHASE_ORDER_API_RESPONSE, RESET_PURCHASE_ORDERS_ARRAY } from "../../utils/Constant";

const INITIAL_STATE = {
    listPurchaseOrder: [],
    paidAmount: 0,
    unpaidAmount: 0,
    totalAmount: 0,
    totalOrders: 0

}

const PurchaseOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PURCHASE_ORDER_API_RESPONSE:
            return {...state, listPurchaseOrder: action.payload.data.listPurchaseOrders, paidAmount: action.payload.data.paidAmount, unpaidAmount: action.payload.data.unPaidAmount, totalAmount: action.payload.data.toalPurchaseOrderAmount, totalOrders: action.payload.data.totalOrder}
    
        case RESET_PURCHASE_ORDERS_ARRAY:
            return {...state, listPurchaseOrder: []}
        }

    return state;
}

export default PurchaseOrderReducer;