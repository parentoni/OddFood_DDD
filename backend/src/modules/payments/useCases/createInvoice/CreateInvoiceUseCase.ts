import { Left, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Payment } from "../../domain/payment";
import { PaymentExternalId } from "../../domain/paymentExternalId";
import { IPaymentRepo } from "../../repo/IPaymentRepo";
import { IPaymentService } from "../../services/IPaymentServices";
import { SUPPORTED_PAYMENT_SERVICES, pixService } from "../../services/implementations/payment_services";
import { CreateInvoiceDTO } from "./createInvoiceDTO";
import { CreateInvoiceErrors } from "./createInvoiceErrors";
import { CreateInvoiceResponse } from "./createInvoiceResponse";
import { FindOrderByIdUseCase } from "../../../orders/useCases/findOrderUseCase/findOrderByIdUseCase";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
//Mapping service name -> service
const services: {[x in SUPPORTED_PAYMENT_SERVICES]: IPaymentService} = {
  PIX: pixService
}
/**
 * @description Use Case that creates invoices accordingly to user service type request, interacting with diferent services
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class CreateInvoiceUseCase implements UseCase<CreateInvoiceDTO, CreateInvoiceResponse> {

  findOrderById: FindOrderByIdUseCase;
  paymentRepo: IPaymentRepo;

  constructor(findOrderById: FindOrderByIdUseCase, paymentRepo: IPaymentRepo) {
    this.findOrderById = findOrderById
    this.paymentRepo = paymentRepo
  }

  async execute(request: CreateInvoiceDTO): Promise<CreateInvoiceResponse> {

    //Check for invalid services
    if (!Object.keys(SUPPORTED_PAYMENT_SERVICES).includes(request.service)) {
      return left(CreateInvoiceErrors.ServiceNotFound(request.service))
    }

    //Check for non-existing user
    const order = await this.findOrderById.execute(request.payment.order_id)
    if (order.isLeft()) {
      return left(CreateInvoiceErrors.UserNotFound(request.payment.order_id))
    }

    //Create external payment id
    const paymentExternalId = PaymentExternalId.createNew()

    //Create payment aggregate
    const payment = Payment.create({order_id: new UniqueGlobalId(request.payment.order_id), amount: request.payment.amount, payed:false, externalId: paymentExternalId, service: request.service})
    if (payment.isLeft()) {
      return left(payment.value)
    }

    //Create invoice with requested service
    const invoice = await services[request.service].createInvoice({payment: payment.value})
    if (invoice.isLeft()) {
      return left(invoice.value)
    }

    //Save payment to repo
    const repoResponse = await  this.paymentRepo.save(payment.value)
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }

    return right({ message: invoice.value.message })
  }
}
