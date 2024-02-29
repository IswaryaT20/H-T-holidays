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
export const PRODUCT_ERROR = 'Eroduct-Error'
export const CLEAR_PRODUCT_ERROR = 'Clear-Product-Error'
export const UPDATE_USER_ID_LOCALLY = 'UPDATE-USER-ID-LOCALLY'


export const KEY_IS_LOGGED_IN = "loggedIn"
export const KEY_USER_ID = "userId"






export const storeToLocalStorage = (key, inputText) => {

    const excryptedText = CryptoJS.AES.encrypt(inputText, 'h&t').toString();

    localStorage.setItem(key, excryptedText.toString())
}

export const getFromLocalStorage = (key) => {
    
    const login = localStorage.getItem(key);

    const decryptedData = CryptoJS.AES.decrypt(login, 'h&t');
    const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);

    return decryptedString;
}