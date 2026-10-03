import type { Access } from 'payload'

export const isBri: { read: Access } = {
  read: ({ req }) => req.user?.name?.toLowerCase() == 'bri',
}
