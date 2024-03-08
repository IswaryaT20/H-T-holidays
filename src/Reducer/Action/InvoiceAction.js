import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllInvoiceRequest = () => {
    return AxiosConfig.post("/v2/invoice/getInvoices");
}