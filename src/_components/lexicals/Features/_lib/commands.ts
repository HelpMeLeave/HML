import { createCommand } from '@payloadcms/richtext-lexical/lexical'

export const definitionCommands = {
  CLEAR: createCommand<void>('CLEAR_GLOSSARY_DEFINITIONS'),
  SCAN: createCommand<void>('SCAN_GLOSSARY_DEFINITIONS'),
}

export const definitionWrapperCommands = {
  PURGE: createCommand<void>('CLEAR_DEFINITION_WRAPPERS'),
  PARSE: createCommand<void>('CREATE_DEFINITION_WRAPPERS'),
}
