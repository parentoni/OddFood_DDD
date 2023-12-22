import mongoose, { Mongoose } from "mongoose";

const PaymentSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, required: true}, // Id do usuário
  payed: {type: Boolean, required: true, default: false}, // Payment pago ou não
  amount: {type: Number, required: true}, // Quantidade monetária em BRL
  external_id: {type: String, required:true, unique:true} // Id de rastreamento externo
})

export interface PersistentPayment {
  _id: string,
  user: string,
  payed: boolean,
  amount: number,
  external_id: string
} 

const PaymentModel = mongoose.model('payment', PaymentSchema)

export { PaymentModel }