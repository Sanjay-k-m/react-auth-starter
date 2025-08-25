import type { BasicErrorResponse } from '~/types/types';

export function isBasicErrorResponse(error: unknown): error is BasicErrorResponse {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'error' in error &&
    'statusCode' in error &&
    'status' in error
  ) {
    const err = error as { status: unknown };
    return err.status === 'error';
  }
  return false;
}
