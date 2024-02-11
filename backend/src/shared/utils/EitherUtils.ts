import { success } from "../core/Response/Error";
import { Either, Right, left, right } from "../core/Result";

export class EitherUtils {
  public static combine<L>(array: Either<L, any>[]): Either<L, success> {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element) {

        if (element.isLeft()) {
          return left(element.value);
        }
      }
    }

    return right(this.success);
  }

  public static get success(): true {
    return true;
  }
}
