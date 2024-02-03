
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";
import { Price } from "../../../../shared/infra/database/models/Item";
type ItemPricesResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemPrices>

export class ItemPrices extends ValueObject<Price[]>{

    get value() : Price[] {
        return this.props
    }

    public static  create( props : Price[]) : ItemPricesResponse {

        for (const price of props) {
            const GuardResponse = Guard.againstNullOrUndefinedBulk([{argument : price.name, argumentName : "PRICE_NAME"}, {argument : price.price, argumentName : "PRICE_NAME"}, {argument : price.cost, argumentName : "PRICE_COST"}])
            if (GuardResponse.isLeft()) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `${GuardResponse.value.error.errorMessage}`,
                    variable: "ITEM_PRICES",
                    location: `${ItemPrices.name}.${ItemPrices.create.name}`
                }))

            }
        }
    
        return right(new ItemPrices(props))


    }
}