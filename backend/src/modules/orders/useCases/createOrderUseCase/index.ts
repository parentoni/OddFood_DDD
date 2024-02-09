import { OrderRepo } from "../../repository/orderRepository";
import { CreateOrderUseCase } from "./createOrderUseCase";

export const createOrderUseCase = new CreateOrderUseCase(new OrderRepo())
export const orderRepo = new OrderRepo()