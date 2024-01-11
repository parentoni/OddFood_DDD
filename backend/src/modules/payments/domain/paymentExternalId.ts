import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import crypto from 'node:crypto'
export interface PaymentExternalIdProps {
  txid: string
}

/**
 * @description A documentação do BACEN (https://bacen.github.io/pix-api/) determina que todo cobrança pix deva conter um TXID, que identifica o pix e deve conter de 26 a 35 caracteres. É essencial armazenar esse ID para garantir a rastreabilidade do PIX.
 * @auhtor Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */

export class PaymentExternalId extends ValueObject<PaymentExternalIdProps> {


  protected static MIN_LENGTH = 25
  protected static MAX_LENGTH = 36

  get value(): any {
    return this.props.txid
  }

  /**
   * 
   * @method create
   * @description Gera um novo object PaymentExternalId com o TXID informado.
   * 
   */
  public static create (props: PaymentExternalIdProps): Either<CommonUseCaseResult.InvalidValue, PaymentExternalId> {
    const guardResult = Guard.againstNullOrUndefined(props.txid, "TXID")
    
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    if (props.txid.length > this.MAX_LENGTH || props.txid.length < this.MIN_LENGTH) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: `ExternalId must have ${this.MAX_LENGTH} > length > ${this.MIN_LENGTH}`,
        location: `${PaymentExternalId.name}.${this.create.name}`,
        variable: 'EXTERNAL_ID'
      }))
    }

    return right(new PaymentExternalId(props))
  }
  
  /**
   * @method createNew
   * @description Generate a new, valid PaymentExternalId, without the necessity with of passing an id.
   * */
  public static createNew ():PaymentExternalId {
    const txid = crypto.randomBytes(16).toString('hex')
    return new PaymentExternalId({txid: txid})
  }
}
