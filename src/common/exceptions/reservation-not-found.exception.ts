import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "./base-http.exception";
import { ERROR_CODE, ErrorCode } from "../constants/error-code.constant";

export class ReservationNotFoundException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.NOT_FOUND;
  readonly errorCode: ErrorCode = ERROR_CODE.RESERVATION_NOT_FOUND;

  constructor() {
    super('Reservation not found')
  }
}