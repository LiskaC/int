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

export type TrackProcessPayload = CreateProcessResponse

export type TrackProcessResponse = {
  status: 'pending' | 'completed' | 'failed'
  hash: string | null
  error: string | null
  /**
   * The hashing duration in ms
   * @example 2165
   */
  processingTime: number
}

export type ErrorResponse = {
  /**
   * @example ['payload must be a string'] or Internal Server Error
   */
  message: string[] | string
  error: string
  statusCode: number
}
