import { origin } from './origin'

export const getReturnUrl = async () => `${await origin()}/donate?result={CHECKOUT_SESSION_ID}`
