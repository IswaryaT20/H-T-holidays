import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllInvoiceRequest = () => {
    return AxiosConfig.post("/v2/invoice/getInvoices");
}

export const CreateInvoice = (data) => {
  return AxiosConfig.post("/v2/invoice/createInvoice", data);
};

export const GenerateInvoicePdfApi = (invoiceId) => {
  return AxiosConfig.get('/v2/pdf/generateInvoice', {
    params: {
      invoiceId: invoiceId
    }
  })
}