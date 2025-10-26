export const ERROR_CODE = {
  VALIDATION_ERROR: 'validation_error',
  INVALID_CREDENTIALS: 'invalid_credentials'
} as const

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]