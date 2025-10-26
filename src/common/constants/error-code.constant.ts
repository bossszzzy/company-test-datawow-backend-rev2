export const ERROR_CODE = {
  VALIDATION_ERROR: 'validation_error',
  CONCERT_NOT_FOUND: 'concert_not_found'
} as const

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]