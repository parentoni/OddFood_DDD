import { right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/User";
import { FindUserByIdDTO } from "./findUserByIdDTO";
import { FindUserByIdResponse } from "./findUserByIdResponse";

export class FindUserByIdUseCase implements UseCase<FindUserByIdDTO, FindUserByIdResponse> {
  async execute(request: FindUserByIdDTO ): Promise<FindUserByIdResponse>  {
    return right(new User({}))
  }


}