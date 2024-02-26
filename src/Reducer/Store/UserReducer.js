import { LOGIN_API_RESPONSE, ERROR_TYPE, CLEAR_ERROR_MESSAGE } from "../../utils/Constant";


const INITIAL_STATE = {
    loginId: 0,
    loginName: '',
    loginRoleId: 0,
    loginCountryId: 0,
    loginEmail: '',
    loginMobile: '',
    isActive: true,
    isLoggedIn: true,
    error: ''
}


const UserReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case LOGIN_API_RESPONSE: {
            return {...state, loginId: action.payload.id, loginName: action.payload.name, loginRoleId: action.payload.roleId, loginCountryId: action.payload.countryId, loginEmail: action.payload.email, loginMobile: action.payload.mobile, isActive: action.payload.active, isLoggedIn: true}
        }
        case ERROR_TYPE: {
            return {...state, error: action.payload}
        }
        case CLEAR_ERROR_MESSAGE: {
            return {...state, error: null}
        }

    }
    return state;
}

export default UserReducer;