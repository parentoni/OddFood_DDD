import { SUPPORTED_PAYMENT_SERVICES } from "../../services/implementations/payment_services"

// Create invoice Use Case required params
export type CreateInvoiceDTO = {
  service: SUPPORTED_PAYMENT_SERVICES,
  payment: {
    amount: number,
    user_id: string,
  }
}
