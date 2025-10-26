export const ERROR_CODE = {
  VALIDATION_ERROR: 'validation_error',
  CONCERT_NOT_FOUND: 'concert_not_found',
  SOLD_OUT: 'sold_out',
  ALREADY_RESERVED: 'already_reserved',
  RESERVATION_NOT_FOUND: 'reservation_not_found',
  USER_NOT_FOUND: 'user_not_found',
  USER_ID_REQUIRED: 'user_id_required',
  ADMIN_ONLY: 'admin_only'
} as const

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]