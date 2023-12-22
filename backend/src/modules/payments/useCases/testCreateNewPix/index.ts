import { createNewPixUseCase } from "../createNewPix";
import { TestCreateNewPixController } from "./testCreateNewPixController";

const testCreateNewPixController = new TestCreateNewPixController(createNewPixUseCase)

export {testCreateNewPixController}