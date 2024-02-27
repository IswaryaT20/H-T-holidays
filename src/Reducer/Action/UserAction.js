import { AxiosConfig } from "../../Networking/AxiosConfig";

export const Login = (bodyData) => {
    return AxiosConfig.post('/v2/account/login', bodyData)
}   

export const Register = (paramsData) => {
    return AxiosConfig.post('/v2/account/register', '', {
        params: paramsData
    })
}