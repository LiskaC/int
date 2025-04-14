import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { CreateProcessResponse } from '../../src/features/hash/types'

export const createProcessResponse: CreateProcessResponse = {
  id: 'e2d124ee-fa63-431d-90ba-56d3dc572cb9',
}
export let serverConfig = {
  shouldFail: false,
}

export const handlers = [
  http.post('http://localhost:3000/process', async ({ request }) => {
    if (serverConfig.shouldFail) {
      return HttpResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      )
    }

    return HttpResponse.json(createProcessResponse, { status: 200 })
  }),

  // GET /process/:id
  http.get('http://localhost:3000/process/:id', async ({ params }) => {
    const { id } = params

    if (serverConfig.shouldFail) {
      return HttpResponse.json(
        {
          message: `Failed to fetch status for process with id: ${id}`,
        },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        status: 'completed',
        processingTime: 1500,
        hash: 'mocked-hash-value',
        error: null,
      },
      { status: 200 }
    )
  }),
]

export const server = setupServer(...handlers)
