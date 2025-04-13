import {
  CreateProcessPayload,
  ErrorResponse,
  CreateProcessResponse,
  TrackProcessResponse,
  TrackProcessPayload,
} from './types'

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

// POST /process
async function createProcess(
  args: CreateProcessPayload
): Promise<CreateProcessResponse> {
  const endpoint = new URL('/process', baseUrl)

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

  return res.json()
}

// GET /process/:id
async function trackProcess(
  args: TrackProcessPayload
): Promise<TrackProcessResponse> {
  const endpoint = new URL(`/process/${args.id}`, baseUrl)

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    const data: ErrorResponse = await res.json()
    throw new Error(
      `Failed to fetch status for process with id: ${args.id}, with message(s):
      ${data.message}`
    )
  }

  return res.json()
}

export default {
  createProcess,
  trackProcess,
}
