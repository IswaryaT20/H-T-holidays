import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllCustomersCall = (businessTypeId) => {
    return AxiosConfig.get('/v2/customer/getAllCustomers', {
        params: {
            businessTypeId: businessTypeId
        }
    })
}

export const CreateCustomerApiCall = (bodyData) => {
    return AxiosConfig.post('v2/customer/addcustomer', bodyData)
}

export const SearchCustomerApiCall = (bodyData) => {
    return AxiosConfig.post('v2/customer/searchCustomer', bodyData)
}