import { findUserByIdUseCase } from "../../../user/useCase/findUserById";
import { paymentRepo } from "../../repo";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";
import { CreateInvoiceController } from "./createInvoiceController"; 

const createInvoiceUseCase = new CreateInvoiceUseCase(findUserByIdUseCase, paymentRepo)
const createInvoiceController = new CreateInvoiceController(createInvoiceUseCase)

export {createInvoiceController}
