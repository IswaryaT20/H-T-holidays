import CryptoJS from "crypto-js";

export const LOGIN_API_CALL = 'Login-API-Call'
export const LOGIN_API_RESPONSE = 'Login-API-Response'
export const REGISTER_API_CALL = 'Register-Api-Call'
export const REGISTER_API_RESPONSE = 'Register-Api-Response'
export const ERROR_TYPE = 'ERROR'
export const ERROR_MESSAGE = 'ERROR-MESSAGE'
export const CLEAR_ERROR_MESSAGE = 'CLEAR-ERROR-MESSAGE'
export const GET_ALL_CUSTOMERS_API_CALL = 'Get-All-Customers'
export const GET_ALL_CUSTOMERS_API_RESPONSE = 'Get-All-Customers-response'
export const MASTER_API_CALL = 'Get-Master-API-call'
export const MASTER_API_RESPONSE = 'Get-Master-API-response'
export const CREATE_CUSTOMER_API_CALL = 'Create-Customer-Call'
export const CREATE_CUSTOMER_API_RESPONSE = 'Create-Customer-Api-Response'
export const GET_ALL_PRODUCTS_API_CALL = 'Get-All-Products'
export const GET_ALL_PRODUCTS_RESPONSE = 'Get-All-Rroducts-Response'
export const ADD_PRODUCT_API_CALL = 'Add_Product_Api_call'
export const ADD_PRODUCT_API_RESPONSE = 'Add_Product_Api_response'
export const PRODUCT_ERROR = 'Eroduct-Error'
export const CLEAR_PRODUCT_ERROR = 'Clear-Product-Error'
export const UPDATE_USER_ID_LOCALLY = 'Update_User_id_Locally'
export const SEARCH_CUSTOMER_API_CALL = 'Search_Customer_API_Call'
export const SEARCH_CUSTOMER_API_RESPONSE = 'Search_Customer_API_Response'
export const SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL = 'Search-Customer-By-Id-Call'
export const SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE = 'Search-Customers-By-Id-Response'
export const GET_LOGGED_USER_DETAILS_API_CALL = 'Get_Logged_User_details'
export const GET_LOGGED_USER_DETAILS_RESPONSE = 'Get-Loggedin-User-Response'
export const GET_ALL_PURCHASE_ORDER_API_CALL = 'Get-All-Purchase-Order-call'
export const GET_ALL_PURCHASE_ORDER_API_RESPONSE = 'Get-All-Purchase-Order-Response'
export const CREATE_PURCHASE_ORDER_API_CALL = 'Create-Purchase-Order-Api-Call'
export const CREATE_PURCHASE_ORDER_API_RESPONSE = 'Create-Purchase-Order-Api-Response'


export const KEY_IS_LOGGED_IN = "loggedIn"
export const KEY_USER_ID = "userId"






export const storeToLocalStorage = (key, inputText) => {

    const excryptedText = CryptoJS.AES.encrypt(inputText.toString(), 'h&t').toString();

    localStorage.setItem(key, excryptedText.toString())
}

export const getFromLocalStorage = (key) => {
    
    const localStorageItem = localStorage.getItem(key) || null;
    
    if (localStorageItem) {
        const decryptedData = CryptoJS.AES.decrypt(localStorageItem, 'h&t');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedString;
    }

    

    return null;
}