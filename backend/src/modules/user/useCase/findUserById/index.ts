import { FindUserByIdUseCase } from "./findUserByIdUseCase"; 
import { FindUserByIdController } from "./findUserByIdController";

const findUserByIdUseCase = new FindUserByIdUseCase(UserRepo) 
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase)

