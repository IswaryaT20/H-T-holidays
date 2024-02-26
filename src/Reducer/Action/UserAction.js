import { AxiosConfig } from "../../Networking/AxiosConfig";

export const Login = (bodyData) => {
    return AxiosConfig.post('/v2/account/login', bodyData)
}   