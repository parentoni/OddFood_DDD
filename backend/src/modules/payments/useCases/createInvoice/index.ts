import { FindUserByIdUseCase } from "../../../user/useCase/findUserById/findUserByIdUseCase";
import { paymentRepo } from "../../repo";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";
import { CreateInvoiceController } from "./createInvoiceController"; 
import { UserRepo } from "../../../user/repository/userRepo";

const createInvoiceUseCase = new CreateInvoiceUseCase(new FindUserByIdUseCase(new UserRepo()), paymentRepo)
const createInvoiceController = new CreateInvoiceController(createInvoiceUseCase)

export {createInvoiceController}
