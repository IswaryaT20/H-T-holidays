import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";
import ProductReducer from "./ProductReducer";
import MasterReducer from "./MasterReducer";
import PurchaseOrderReducer from "./PurchaseOrderReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer,
    masterData: MasterReducer,
    productsData: ProductReducer,
    purchaseOrder: PurchaseOrderReducer
})

export default RootReducer;