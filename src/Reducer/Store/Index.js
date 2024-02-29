import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";
import MasterReducer from "./MasterReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer,
    masterData: MasterReducer
})

export default RootReducer;