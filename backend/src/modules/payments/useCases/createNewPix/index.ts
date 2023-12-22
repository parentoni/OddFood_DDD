import { findUserByIdUseCase } from "../../../user/useCase/findUserById";
import { CreateNewPixUseCase } from "./createNewPixUseCase";

const createNewPixUseCase = new CreateNewPixUseCase(findUserByIdUseCase)

export {createNewPixUseCase}