import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../../shared/core/Result";
import { CreateInvoiceProps, IPaymentService } from "../../IPaymentServices";
import { IPixApi } from "../../IPixAPI";

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

}
