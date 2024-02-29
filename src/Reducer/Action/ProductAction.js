import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllProducts = () => {
    return AxiosConfig.post('v2/products/getProducts')
}