import { ALL_UPLOAD_MIMES } from '@/_components/blocks/Form/_lib/fileTypes'
import { tFn } from '@/_config/i18n/'
import type { CollectionConfig } from 'payload'

// Storage for files uploaded through public-facing Form Upload fields. Kept separate
// from the curated `media` library: writes only happen server-side via the
// /api/form-upload route (overrideAccess), and reads are limited to authenticated
// admins viewing submissions.
const FormUploads: CollectionConfig<'form-uploads'> = {
  slug: 'form-uploads',
  admin: {
    useAsTitle: 'filename',
    description: 'Files uploaded via public form Upload fields.',
    hideAPIURL: true,
    group: false,
  },
  timestamps: true,
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => !!user,
  },
  labels: {
    singular: tFn('title:formUploads'),
    plural: tFn('title:formUploads'),
  },
  fields: [],
  upload: {
    // The superset of every selectable category; each form field narrows within it,
    // and the route handler enforces the field's configured types server-side.
    mimeTypes: ALL_UPLOAD_MIMES,
    filesRequiredOnCreate: true,
  },
}

export default FormUploads
