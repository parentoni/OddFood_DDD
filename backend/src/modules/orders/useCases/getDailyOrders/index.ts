import { OrderRepo } from "../../repository/orderRepository";
import { FindDailyOrdersUseCase } from "./findDailyOrdersUseCase";
export const findDailyOrdersUseCase = new FindDailyOrdersUseCase(new OrderRepo())

