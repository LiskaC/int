import { HashResponse } from './types'

const baseURl = process.env.BASE_URL || 'http://localhost:3000'

// POST /process
async function hash(payload: string): Promise<HashResponse> {
  const endpoint = new URL('/process', baseURl)

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ payload: payload }),
  })

  if (!res.ok) {
    // TODO - check that the failure response does return like this
    const data = await res.json()
    throw new Error(
      `Failed to hash string: ${payload} with status ${data.message}`
    )
  }

  return await res.json()
}

// GET /process/:id

export default {
  hash,
}
