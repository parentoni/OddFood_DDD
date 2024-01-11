import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, right } from "../../../../../shared/core/Result";
import { PixCob, PixCobStatus } from "../../../dtos/PixDTO";
import { CreateInvoiceProps } from "../../IPaymentServices";
import { IPixApi } from "../../IPixAPI";

//temporary until gerencianet account setup
export class GerenciaNet implements IPixApi {
  
  public async createCob(props: CreateInvoiceProps): Promise<Either<CommonUseCaseResult.InvalidValue, PixCob>> {

    return right({
      calendario: {
        criacao: "2020-09-09T20:15:00.358Z",
        expiracao: 3600
      },
      txid: props.payment.externalId.value,
      valor: {
        original: props.payment.amount.toFixed(2)
      },
      revisao: 0,
      status: PixCobStatus.ATIVA,
      devedor: {
        cnpj: '000.000.000/0000-00',
        name: "",
      },
      chave: "000.000.000-00",

    })
  }
}
