import mongoose, { Mongoose } from "mongoose";
import { SUPPORTED_PAYMENT_SERVICES } from "../../../../modules/payments/services/implementations/payment_services";
import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";

const PaymentSchema = new mongoose.Schema({
  order_id: {type: mongoose.Types.ObjectId, required: true}, // Id do pedido
  payed: {type: Boolean, required: true, default: false}, // Payment pago ou não
  amount: {type: Number, required: true}, // Quantidade monetária em BRL
  external_id: {type: String, required:true, unique:true}, // Id de rastreamento externo
  service: {type: String, enum: SUPPORTED_PAYMENT_SERVICES, required:true} // Servico utilizado para a transacao: PIX, CC, etc
})

export interface PersistentPayment {
  _id: string,
  order_id: string,
  payed: boolean,
  amount: number,
  external_id: string
  service: SUPPORTED_PAYMENT_SERVICES
}

// Set up subscriptions triggers
PaymentSchema.post("save", (payment) => DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(payment._id.toString())))
PaymentSchema.post("findOneAndUpdate", (payment) => DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(payment._id.toString())))

const PaymentModel = mongoose.model('payment', PaymentSchema)

export { PaymentModel }
