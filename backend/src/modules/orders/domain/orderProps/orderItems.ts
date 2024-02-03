import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { IItemWithObservations } from "../../../../shared/infra/database/models/Item";


export class OrderItems extends ValueObject<IItemWithObservations[]> {

    get value() : string {
        return this.value
    }

    public static create(props : IItemWithObservations[]) : PropsResponse<OrderItems> {
        
        for (const item of props) {
            
        }

        
    }
}