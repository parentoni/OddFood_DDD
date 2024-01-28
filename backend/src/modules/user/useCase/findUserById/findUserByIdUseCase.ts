import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repository/IUserRepo";
import { FindUserByIdResponse } from "./findUserByIdResponse";

export class FindUserByIdUseCase implements UseCase<string, FindUserByIdResponse> {
  private userRepo : IUserRepo

  constructor(repo : IUserRepo) {
    this.userRepo = repo
  }

  async execute(request: string ): Promise<FindUserByIdResponse>  {

    const GuardResponse = Guard.againstNullOrUndefined(request, "FIND_USER_ID")

    if (GuardResponse.isLeft()) {
      return left(GuardResponse.value)
    }

    try {

      const user = await this.userRepo.find_one({dto : {_id : request}})
    
      if (user.isLeft()) {
        return left(user.value)
      }

    return right(user.value)

    }catch (err) {
      return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
  }


}
