import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllCustomersCall = () => {
    return AxiosConfig.get('/v2/customer/getAllCustomers')
}

export const CreateCustomerApiCall = (bodyData) => {
    console.log(bodyData)
    return AxiosConfig.post('v2/customer/addcustomer', bodyData)
}