import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-code.constant';

export type ErrorResponse = {
  success: false;
  statusCode: HttpStatus;
  errorCode: ErrorCode;
  message: string;
  details?: unknown;
};
