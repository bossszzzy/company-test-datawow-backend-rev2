import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "./base-http.exception";
import { ERROR_CODE, ErrorCode } from "../constants/error-code.constant";

export class SoldOutException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  readonly errorCode: ErrorCode = ERROR_CODE.SOLD_OUT;

  constructor() {
    super('Sold Out!')
  }
}