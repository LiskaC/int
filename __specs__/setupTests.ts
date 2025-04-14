import { server } from './mocks/server' // or wherever you defined it

// Start API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
