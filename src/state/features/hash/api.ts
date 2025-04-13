import {
  CreateProcessPayload,
  ErrorResponse,
  CreateProcessResponse,
} from './types'

const baseURl = process.env.BASE_URL || 'http://localhost:3000'

// POST /process
async function createProcess(
  args: CreateProcessPayload
): Promise<CreateProcessResponse> {
  const endpoint = new URL('/process', baseURl)

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    // more verbose than JSON.stringify({ payload }), but I probably prefer the
    // clarity on exactly which args are being passed
    body: JSON.stringify({ payload: args.payload }),
  })

  if (!res.ok) {
    const data: ErrorResponse = await res.json()
    throw new Error(
      `Failed to create process with string: ${args.payload} with message(s):
      ${data.message}`
    )
  }

  return await res.json()
}

// GET /process/:ids

export default {
  createProcess,
}
