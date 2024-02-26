import { combineReducers } from "redux";
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
    users: UserReducer
})

export default RootReducer;