import { Secrets } from "../../../../../config/secretsManager";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../../shared/core/Result";
import { CertificatedApi } from "../../../../../shared/core/certificatedApi";
import { PixCob, PixCobStatus } from "../../../dtos/PixDTO";
import { CreateInvoiceProps } from "../../IPaymentServices";
import { IPixApi } from "../../IPixAPI";

export type GerenciaNetOAuthResponse = {access_token:string}
export class GerenciaNet implements IPixApi {
  gerenciaNetApi: CertificatedApi;
 
  // Dependency injection of gerencia net certificated api
  constructor(gerenciaNetApi: CertificatedApi) {
    this.gerenciaNetApi = gerenciaNetApi
  }

  public async createCob(props: CreateInvoiceProps): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, PixCob>> {

    //Authenticate using oauth
    const OAuthResponse = await this.gerenciaNetApi.request<GerenciaNetOAuthResponse>({
      url: Secrets.getSecret('GERENCIANET_PIX_API') + '/oauth/token',
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(Secrets.getSecret("GERENCIANET_PIX_CLIENT_ID") + ":" + Secrets.getSecret("GERENCIANET_PIX_CLIENT_SECRET"))}`,// Basic authorization,
        "Content-Type": "application/json"
      },

      data: JSON.stringify({
        "grant_type": "client_credentials"
      })
    })

    //Check if response was null
    if (OAuthResponse.isLeft()) {
      console.log(OAuthResponse.value)
      return left(OAuthResponse.value)
    }

    //Generate pix
    const cobResponse = await this.gerenciaNetApi.request<PixCob>({
      url: Secrets.getSecret('GERENCIANET_PIX_API') + `/v2/cob/${props.payment.externalId.value}`,
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${OAuthResponse.value.access_token}`,
        "Content-Type": 'application/json'
      },
      data: JSON.stringify({
        calendario: {
          expiracao: 3600, //60 mins
        },
        valor: {
          original: props.payment.amount.toFixed(2) //Value must be string
        },
        chave: Secrets.getSecret("GERENCIANET_PIX_CHAVE")
      })
    })

    //Check error pix creation
    if (cobResponse.isLeft()) {
      return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Unable able to generate pix",
          variable: "PIX",
          location: "Gerencianet.createCob"
      }))
    }


    return right(cobResponse.value)

  }
}
