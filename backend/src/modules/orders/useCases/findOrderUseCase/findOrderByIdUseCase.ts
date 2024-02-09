import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { OrderRepo } from "../../repository/orderRepository";
import { IOrderRepository } from "../../repository/IOrderRepository";
import { RepositoryBaseResult } from "../../../../shared/core/IBaseRepository";
import { IOrder } from "../../../../shared/infra/database/models/Order";

export class FindOrderByIdUseCase implements UseCase<string, RepositoryBaseResult<IOrder>> {
  private orderRepo : IOrderRepository

  constructor(repo : IOrderRepository) {
    this.orderRepo = repo
  }

  

  async execute(request: string ): RepositoryBaseResult<IOrder>  {

    const GuardResponse = Guard.againstNullOrUndefined(request, "FIND_USER_ID")

    if (GuardResponse.isLeft()) {
      return left(GuardResponse.value)
    }
    
    try {
      console.log(request, "AAH")
      const user = await this.orderRepo.find_one({dto : request})
    
      if (user.isLeft()) {
        return left(user.value)
      }

    return right(user.value)

    }catch (err) {
      return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
  }


}
