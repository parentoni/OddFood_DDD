import { RepositoryBaseResult } from "../../../../shared/core/IBaseRepository";
import { UseCase } from "../../../../shared/core/UseCase";
import { IOrder, IOrderWithoutId } from "../../../../shared/infra/database/models/Order";
import { Order } from "../../domain/order";
import { OrderDate } from "../../domain/orderProps/orderDate";
import { OrderItems } from "../../domain/orderProps/orderItems";
import { OrderPayment } from "../../domain/orderProps/orderPayment";
import { OrderUsername } from "../../domain/orderProps/orderUsername";
import { IOrderRepository } from "../../repository/IOrderRepository";
import { Left, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IPaymentService } from "../../../payments/services/IPaymentServices";
import { createInvoiceUseCase } from "../../../payments/useCases/createInvoice";
import { CreateInvoiceDTO } from "../../../payments/useCases/createInvoice/createInvoiceDTO";
import { SUPPORTED_PAYMENT_SERVICES } from "../../../payments/services/implementations/payment_services";
import { OrderMap } from "../../mapper/orderMap";


export class CreateOrderUseCase implements UseCase<IOrderWithoutId, RepositoryBaseResult<{ message: string }>> {
    private orderRepo : IOrderRepository

    constructor(orderRepo : IOrderRepository) {
        this.orderRepo = orderRepo
    }
    async execute(props : IOrderWithoutId) : RepositoryBaseResult<{ message: string }> {
        const dateOrError = OrderDate.create({value : props.date})
        const itemsOrError = await OrderItems.create({value : props.items})
        const usernameOrError = OrderUsername.create({value : props.username})
        
        if (dateOrError.isLeft()) {
            return left(dateOrError.value)
        }
        if (itemsOrError.isLeft()) {
            return left(itemsOrError.value)
        }
        if (usernameOrError.isLeft()) {
            return left(usernameOrError.value)
        }
      
        const orderOrError = Order.create({
            date : dateOrError.value,
            username : usernameOrError.value,
            items : itemsOrError.value,
            paid : false,
        })

        if (orderOrError.isLeft()) {
            return left(orderOrError.value)
        }

        // export type CreateInvoiceDTO = {
        //     service: SUPPORTED_PAYMENT_SERVICES,
        //     payment: {
        //       amount: number,
        //       order_id: string,
        //     }
        //   }
          
        try {
            

                const orderPersistent = OrderMap.toPersistent(orderOrError.value)


                if (orderPersistent.isLeft()) {
                    return left(orderPersistent.value)
                }

                let value = 0

                for (const orderValue of orderOrError.value.items) {
                    value += orderValue.price
                }

                if (value < 1) {
                    return left(CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `Order value is less than 1.`,
                        variable: "ORDER_VALUE",
                        location: `${OrderDate.name}.${OrderDate.create.name}`
                    }))
                }

                const order = await this.orderRepo.save({dto : orderPersistent.value})

                if (order.isLeft()) {
                    return left(order.value)
                }

                const paymentInfo = await createInvoiceUseCase.execute({service : SUPPORTED_PAYMENT_SERVICES.PIX, payment : {amount : value, order_id : orderPersistent.value._id}})

                if (paymentInfo.isLeft()) {
                    // console.log("ERRROOO")
                    return left(paymentInfo.value)
                }

                return right(paymentInfo.value)

        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }

    }
}