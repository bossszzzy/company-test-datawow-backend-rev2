import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "./base-http.exception";
import { ERROR_CODE, ErrorCode } from "../constants/error-code.constant";

export class UserIdRequiredException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.USER_ID_REQUIRED;

  constructor() {
    super('userid required')
  }
}