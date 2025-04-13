export type CreateProcessPayload = {
  /**
   * The string for which to create a hashing process
   */
  payload: string
}

export type CreateProcessResponse = {
  /**
   * The id of the hashing process, can be used to retrieve the process status
   */
  id: string
}

export type ErrorResponse = {
  /**
   * {@example} ['payload must be a string'] or Internal Server Error
   */
  message: string[] | string
  error: string
  statusCode: number
}
