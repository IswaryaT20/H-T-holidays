import { LOGIN_API_RESPONSE, ERROR_TYPE, CLEAR_ERROR_MESSAGE, REGISTER_API_RESPONSE } from "../../utils/Constant";


const INITIAL_STATE = {
    status: 0,
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
            const data = action.payload.data
            return {...state, status: action.payload.code, loginId: data.id, loginName: data.name, loginRoleId: data.roleId, loginCountryId: data.countryId, loginEmail: data.email, loginMobile: data.mobile, isActive: data.active, isLoggedIn: true}
        }
        case ERROR_TYPE: {
            return {...state, error: action.payload}
        }
        case CLEAR_ERROR_MESSAGE: {
            return {...state, error: null}
        }

        case REGISTER_API_RESPONSE: {
            return {...state, error: action.payload.errorMessage, status: action.payload.code, isLoggedIn: true}
        }

    }
    return state;
}

export default UserReducer;