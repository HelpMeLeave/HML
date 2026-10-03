import { stripe } from '@/app/(api)/stripe'
import { getReturnUrl } from '@/app/(api)/stripe/_lib/getReturnUrl'
import { createNewItem } from '@/app/(api)/stripe/_lib/utils'
import type {
  InitSesionData,
  ReturnSesstionData,
  StripeMetaData,
} from '@/app/(api)/stripe/_types/SessionData'

const checkoutSession = stripe.checkout.sessions

export const initCheckout = async (data: InitSesionData): Promise<ReturnSesstionData> => {
  const { email, amount } = data

  const session = await checkoutSession.create({
    ui_mode: 'elements',
    mode: 'payment',
    customer_creation: 'if_required',
    integration_identifier: 'hml-donate-tyiuh',
    adaptive_pricing: { enabled: true },
    metadata: {
      firstName: data.firstName,
      lastName: data.lastName,
      newsletter: data.newsletter ? 1 : 0,
      email,
    } as StripeMetaData,
    customer_email: email as string,
    line_items: [createNewItem(data)],
    return_url: await getReturnUrl(),
  })

  if (!session.client_secret) {
    throw new Error(`Stripe returned no client secret for session ${session.id}`)
  }
  return {
    clientSecret: session.client_secret,
    sessionId: session.id,
    amount: amount,
    error: null,
  }
}
