import { MASTER_API_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
    addressTypes: [],
    businessTypes: [],
    customerCategories: [],
    userRoles: []
}

const MasterReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case MASTER_API_RESPONSE:
            console.log(action)
            return {...state, addressTypes: action.payload.addressTypes, businessTypes: action.payload.businessTypes, customerCategories: action.payload.customerCategories, userRoles: action.payload.userRoles }
    }
    return state
}   

export default MasterReducer;