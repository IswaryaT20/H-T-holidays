import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer
})

export default RootReducer;