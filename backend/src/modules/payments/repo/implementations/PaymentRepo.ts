import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { PaymentModel } from "../../../../shared/infra/database/models/Payment";
import { Payment } from "../../domain/payment";
import { PaymentMap } from "../../mapper/PaymentMap";
import { IPaymentRepo } from "../IPaymentRepo";

export class PaymentRepo implements IPaymentRepo {

  public async save(payment: Payment): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    try {
      
      const persistent = PaymentMap.toPersistent(payment)
      const exists = await PaymentModel.exists({_id: persistent._id})

      if (exists) {
        await PaymentModel.findOneAndUpdate({_id: persistent._id}, {...persistent})
      } else {
        await PaymentModel.create({...persistent})
      }

      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

  public async findOneByExternalId(externalId: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Payment>> {
    try {
      const result = await PaymentModel.findOne({ external_id: externalId })
      result?._id
      if (result?._id && result) {
        const domain = PaymentMap.toDomain(result.toObject())
        
        if (domain.isLeft()) {
          return left(domain.value)
        }

        return right(domain.value)
      }
        
      return left(CommonUseCaseResult.InvalidValue.create({
        location: `${PaymentRepo.name}.${this.findOneByExternalId.name}`,
        errorMessage: "The requested externalId was not found",
        variable: "EXTERNAL_ID"
      }))
      
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

}