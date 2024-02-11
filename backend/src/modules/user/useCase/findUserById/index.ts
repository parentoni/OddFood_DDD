import { FindUserByIdUseCase } from "./findUserByIdUseCase"; 
import { FindUserByIdController } from "./findUserByIdController";
import { userRepo } from "../../repository";

const findUserByIdUseCase = new FindUserByIdUseCase(userRepo) 
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase)

