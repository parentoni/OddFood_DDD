import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { IItem } from "../../../shared/infra/database/models/Item";
import { Item } from "../domain/item";

export class ItemMap {
    public static toDomain(props : Item) : Either<CommonUseCaseResult.UnexpectedError, IItem> {
        try {
            const domain : IItem = {
                name : props.props.name.value,
                cost : props.props.cost.value,
                image : props.props.picture.value,
                prices : props.props.prices.value,
                isPrimary : props.props.isPrimary,
                _id : props.id.toValue(),
                specialDay : props.props.specialDay.value,
                description : props.props.description.value
            }

            return right(domain)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
}