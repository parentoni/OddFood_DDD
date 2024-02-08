import { FindUserByIdUseCase } from "../../../user/useCase/findUserById/findUserByIdUseCase";
import { FindOrderByIdUseCase } from "../../../orders/useCases/findOrderUseCase/findOrderByIdUseCase";
import { paymentRepo } from "../../repo";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";
import { CreateInvoiceController } from "./createInvoiceController"; 
import { UserRepo } from "../../../user/repository/userRepo";
import { OrderRepo } from "../../../orders/repository/orderRepository";
const createInvoiceUseCase = new CreateInvoiceUseCase(new FindOrderByIdUseCase(new OrderRepo()), paymentRepo)
const createInvoiceController = new CreateInvoiceController(createInvoiceUseCase)

export {createInvoiceController, createInvoiceUseCase}
