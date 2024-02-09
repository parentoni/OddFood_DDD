import { OrderRepo } from "../../repository/orderRepository";
import { FindOrderByIdUseCase } from "./findOrderByIdUseCase";

export const findOrderByIdUseCase = new FindOrderByIdUseCase(new OrderRepo())

