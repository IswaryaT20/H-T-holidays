import { GET_ALL_PURCHASE_ORDER_API_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
    listPurchaseOrder: []

}

const PurchaseOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PURCHASE_ORDER_API_RESPONSE:
            return {...state, listPurchaseOrder: action.payload.data}
    }

    return state;
}

export default PurchaseOrderReducer;