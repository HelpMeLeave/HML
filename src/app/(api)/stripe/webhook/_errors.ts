export class NoPaymentIntentError extends Error {
  message: string
  constructor(sessionId: string) {
    super()
    this.message = `Session ${sessionId} has no payment intent`
  }
}
