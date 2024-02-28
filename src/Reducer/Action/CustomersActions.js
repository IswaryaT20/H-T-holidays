import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllCustomersCall = () => {
    return AxiosConfig.get('/v2/customer/getAllCustomers')
}