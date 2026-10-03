'use server'

import configPromise from '@/_config/payload.config'
import { getPayload as getPayloadOfficial } from 'payload'

export const getPayload = async () => await getPayloadOfficial({ config: configPromise })
