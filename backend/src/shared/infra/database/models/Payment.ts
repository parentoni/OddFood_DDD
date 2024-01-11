import mongoose, { Mongoose } from "mongoose";
import { SUPPORTED_PAYMENT_SERVICES } from "../../../../modules/payments/services/implementations/payment_services";

const PaymentSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, required: true}, // Id do usuário
  payed: {type: Boolean, required: true, default: false}, // Payment pago ou não
  amount: {type: Number, required: true}, // Quantidade monetária em BRL
  external_id: {type: String, required:true, unique:true}, // Id de rastreamento externo
  service: {type: String, enum: SUPPORTED_PAYMENT_SERVICES, required:true} // Servico utilizado para a transacao: PIX, CC, etc
})

export interface PersistentPayment {
  _id: string,
  user: string,
  payed: boolean,
  amount: number,
  external_id: string
  service: SUPPORTED_PAYMENT_SERVICES
} 

const PaymentModel = mongoose.model('payment', PaymentSchema)

export { PaymentModel }
