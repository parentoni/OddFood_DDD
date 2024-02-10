import semver from "semver";
import { Guard } from "./Guard";
import { Either, Left, left, right } from "./Result";
import { GenericError, IBaseError } from "./Response/Error";
import { CommonUseCaseResult } from "./Response/UseCaseError";

export type VersionControlRegister<T> = {
  [x in string]: T;
};

/**
 * {"2.0.0": x,
 * "1.0.0": y}
 * typeof x == y
 */

export class VersionControl<T> {
  public register: VersionControlRegister<T> = {};
  protected defaultVersion: string;

  public constructor(defaultVersion?: string) {
    this.defaultVersion = defaultVersion || "latest_stable";
  }

  public addToRegister(version: string, value: T) {
    const clean = semver.valid(version);
    const check = Guard.againstNullOrUndefined(clean, "version");
    if (check.isLeft()) {
      
      throw new TypeError(`[VersionRegister(register)]: ${check.value.error.errorMessage}`);
    } else {
      const guardAlreadyInRegister = Guard.inArray(version, Object.keys(this.register), "version");
      if (guardAlreadyInRegister.isLeft()) {
        throw new RangeError(`[VersionRegister(register)]: ${guardAlreadyInRegister}`);
      } else {
        this.register[version] = value;
        //In case of register error application must raise error.
      }
      //In case of register error application must raise error.
    }
  }

  public getVersion(version?: string): Either<GenericError<IBaseError>, T> {
    if (version) {
      const searchResult = this.findVersionInRegister(version);

      if (searchResult.isLeft()) {
        return left(searchResult.value);
      } else {
        return right(searchResult.value);
      }
    } else {
      if (this.defaultVersion !== "latest_stable") {
        const deafultSearchResult = this.findVersionInRegister(this.defaultVersion);
        if (deafultSearchResult.isLeft()) {
          return left(deafultSearchResult.value);
        } else {
          return right(deafultSearchResult.value);
        }
      }

      const highestVersion = this.max();

      if (highestVersion.isLeft()) {
        return left(highestVersion.value);
      } 

      const registeredItem: T | undefined = this.register[highestVersion.getRight()]

      //Check if registered item exists
      if (!registeredItem) {
        return left(CommonUseCaseResult.InvalidValue.create({
            errorMessage: "Unable to find registered item",
            variable: "REGSITERED_ITEM",
            location: "VersionControl.getVersion"
        }))
      }

      return right(registeredItem);
    }
  }

  private findVersionInRegister(version: string): Either<GenericError<IBaseError>, T> {
    const cachedVersionData : T|undefined= this.register[version];

    const check = Guard.againstNullOrUndefined(cachedVersionData, "Cached version data");
    if (check.isLeft()) {
      return left(check.value);
    }
    
    if (!cachedVersionData){
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Unable to find registered item",
        variable: "REGSITERED_ITEM",
        location: "VersionControl.getVersion"
      }))
    }

    return right(cachedVersionData);

  }

  public set default(version: string) {
    const clean = semver.clean(version);
    const check = Guard.againstNullOrUndefined(clean, "Default version");
    if (check.isRight()) {
      this.defaultVersion = version;
      return;
    }

    throw new Error("Invalid version provided: " + version);
  }

  //TODO: CHECK IF VERSION IS IN PRODUCTION

  public max(): Either<GenericError<IBaseError>, string> {
    const checkEmpty = Guard.againstEmpty(Object.keys(this.register), "Version register");

    if (checkEmpty.isRight()) {
      let max: string = "0.0.0";
      for (let i = 0; i < Object.keys(this.register).length; i++) {
        const v = Object.keys(this.register)[i] || '0.0.1'

        if (semver.gt(v , max)) {
          max = v;
        }
      }

      return right(max);
    }

    return left(
      CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Version Control is empty",
        location: `${VersionControl.name}.${this.max.name}`,
        variable: "VERSION"
      })
    );
  }

  public contains(v: string): boolean {
    const checkEmpty = Guard.againstEmpty(Object.keys(this.register), "Version register");
    if (checkEmpty.isLeft()) {
      throw new TypeError(`[VersionRegister(contains)]: ${checkEmpty.value.error.errorMessage}`);
      
    } else {
      if (Object.keys(this.register).includes(v)) {
        return true;
      }
      return false;
    }
  }
}
