import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "./base-http.exception";
import { ERROR_CODE, ErrorCode } from "../constants/error-code.constant";

export class AdminOnlyException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.FORBIDDEN;
  readonly errorCode: ErrorCode = ERROR_CODE.ADMIN_ONLY;

  constructor() {
    super('Admin only')
  }
}