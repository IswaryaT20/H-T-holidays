import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";
import ProductReducer from "./ProductReducer";
import MasterReducer from "./MasterReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer,
    masterData: MasterReducer,
    productsData: ProductReducer
})

export default RootReducer;