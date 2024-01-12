import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, Left, left, right } from "../../../../../shared/core/Result";
import { IPixApi } from "../../IPixAPI";
import { PixCob } from "../../../dtos/PixDTO";
import { CreateInvoiceProps, CallbackInterpreterProps, IPaymentService,  } from "../../IPaymentServices"


/**
 * @description Service that handles all PIX invoices.
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class PixService implements IPaymentService {

  private pixApis: IPixApi[]
  /**
   * @description Creates a new instance of the service.
   * @param pixApis - List of possible pix apis
   * */
  constructor(pixApis: IPixApi[]) {
    this.pixApis = pixApis
  }


  public async createInvoice(props: CreateInvoiceProps): Promise<Either<CommonUseCaseResult.InvalidValue, { message: string }>> {

    // Iterate through all pix APIs, maximixing the chance of the invoice being created
    for (const api of this.pixApis) {
      const response = await api.createCob(props)
      if (response.isRight()) {
        //todo: Add qr code 
        return right({message: "QR-CODE"})
      }
    }

    //Pix was not created even when backup APIs were called, problably due to non supported amount
    return left(CommonUseCaseResult.InvalidValue.create({
      location: `${PixService.name}.${this.createInvoice.name}`,
      errorMessage: "Something went wrong creating the PIX invoice, check all data",
      printableErrorMessage: "Algo deu errado gerando a cobranca PIX, favor verificar os dados",
      variable: "PROPS" 
    }))
  }

  public async callbackInterpreter(props: CallbackInterpreterProps<PixCob>): Promise<Either<CommonUseCaseResult.InvalidValue, null>> {

    //Check if payed value is payment value
    if (props.payment.amount !== Number(props.paymentDTO.valor.original)){
      return left(CommonUseCaseResult.InvalidValue.create({
        location: `${PixService.name}.${this.callbackInterpreter.name}`,
        errorMessage: "PIX payment did not transfered right value.",
        printableErrorMessage: "O pagamento pix nao transferiu o valor correto",
        variable: 'AMOUNT'
      }))}

    //Check if payment was already paid
    if (props.payment.payed) {
      return left(CommonUseCaseResult.Conflict.create({
        location: `{PixService.name}.${this.callbackInterpreter.name}`,
        errorMessage: "Payment is already paid",
        printableErrorMessage: "O Pagamento pix ja foi pago",
        variable: "PAYMENT.PAYED"
      }))
    }
    //Mark payment as paid
    props.payment.pay()

    return right(null)
  }


}
