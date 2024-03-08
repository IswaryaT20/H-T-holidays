import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllInvoices = () => {
  return AxiosConfig.post("/v2/invoice/getInvoices");
};

export const CreateInvoice = (data) => {
  return AxiosConfig.post("/v2/invoice/createInvoice", data);
};
