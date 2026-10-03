import { COUNTRY_ISO3 } from '@/lib/constants/COUNTRY_ISO'
import { toTitleCase } from '@/lib/textCasing'
import type { I18n } from '@payloadcms/translations'
import type { JSONSchema4 } from 'json-schema'
import type { SanitizedConfig } from 'payload'

type SchemaProps = {
  collectionIDFieldTypes: {
    [key: string]: 'string' | 'number'
  }
  config: SanitizedConfig
  i18n: I18n
  jsonSchema: JSONSchema4
}

const createCustomFields = (): JSONSchema4 => {
  const customId = (label: string) => `FieldCustom${toTitleCase(label)}`
  const track: JSONSchema4 = {
    id: customId('track'),
    type: 'boolean',
  }

  const locked: JSONSchema4 = {
    id: customId('locked'),
    type: 'boolean',
    required: false,
  }

  const flag: JSONSchema4 = {
    id: customId('flag'),
    type: 'boolean',
    required: false,
  }

  const layout: JSONSchema4 = {
    id: customId('layout'),
    type: 'object',
    properties: {
      labelSize: {
        enum: ['small', 'base', 'large'],
        required: false,
      },
      wrap: {
        enum: ['wrap', 'nowrap'],
        required: false,
      },
      direction: {
        enum: ['row', 'column'],
        required: false,
      },
    },
    additionalProperties: false,
  }

  return {
    type: 'object',
    id: customId('options'),
    properties: {
      track,
      locked,
      flag,
      layout,
    },
    additionalProperties: false,
  }
}

export const Schema = [
  ({ jsonSchema }: SchemaProps): JSONSchema4 => ({
    ...jsonSchema,
    definitions: {
      ...jsonSchema.definitions,
      customField: createCustomFields(),
      countryISO: {
        enum: COUNTRY_ISO3,
        id: 'CountryISO',
      },
    },
  }),
]
