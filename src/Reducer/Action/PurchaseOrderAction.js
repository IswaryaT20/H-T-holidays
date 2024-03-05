import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllPurchaseOrder = () => {
    return AxiosConfig.post('/v2/purchaseOrder/getPurchaseOrders');
}