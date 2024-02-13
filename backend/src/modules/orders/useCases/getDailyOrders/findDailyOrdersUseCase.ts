import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { OrderRepo } from "../../repository/orderRepository";
import { IOrderRepository } from "../../repository/IOrderRepository";
import { RepositoryBaseResult } from "../../../../shared/core/IBaseRepository";
import { IOrder } from "../../../../shared/infra/database/models/Order";

export class FindDailyOrdersUseCase implements UseCase<void, RepositoryBaseResult<any[]>> {
  private orderRepo : IOrderRepository

  constructor(repo : IOrderRepository) {
    this.orderRepo = repo
  }

  async execute(): RepositoryBaseResult<any[]>  {
    // const GuardResponse = Guard.againstNullOrUndefined(request, "FIND_USER_ID")

    // if (GuardResponse.isLeft()) {
    //   return left(GuardResponse.value)
    // }
    
    try {
      const orders = await this.orderRepo.findByDate({date : new Date()})
    
      if (orders.isLeft()) {
        return left(orders.value)
      }
    return right(orders.value)

    }catch (err) {
      return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
  }


}
