import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllPurchaseOrder = () => {
    return AxiosConfig.post('/v2/purchaseOrder/getPurchaseOrders');
}

export const CreatePurchaseOrder = (data) => {
    return AxiosConfig.post('/v2/purchaseOrder/createPurchaseOrder', data)
}