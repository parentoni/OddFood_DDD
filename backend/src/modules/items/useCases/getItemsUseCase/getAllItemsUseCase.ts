import { Guard } from "../../../../shared/core/Guard";
import { RepositoryBaseResult } from "../../../../shared/core/IBaseRepository";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IItem } from "../../../../shared/infra/database/models/Item";
import { IItemRepo } from "../../repository/IItemRepo";
export class GetAllItemsUseCase implements UseCase<string, RepositoryBaseResult<IItem[]>> {
  private itemRepo : IItemRepo

  constructor(repo : IItemRepo) {
    this.itemRepo = repo
  }

  async execute(): RepositoryBaseResult<IItem[]>  {

    try {

      const items = await this.itemRepo.find_many({dto : {}})
    
      if (items.isLeft()) {
        return left(items.value)
      }

    return right(items.value)

    }catch (err) {
      return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
  }


}
