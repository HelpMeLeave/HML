import { CheckboxFieldComponent } from '@/_components/blocks/Form/CheckboxField'
import { CountryFieldComponent } from '@/_components/blocks/Form/CountryField'
import { EmailFieldComponent } from '@/_components/blocks/Form/EmailField'
import { GroupFieldComponent } from '@/_components/blocks/Form/Group'
import { MessageFieldComponent } from '@/_components/blocks/Form/MessageField'
import { NumberFieldComponent } from '@/_components/blocks/Form/NumberField'
import { PronounsFieldComponent } from '@/_components/blocks/Form/PronounsField'
import { RadioFieldComponent } from '@/_components/blocks/Form/RadioField'
import { SelectFieldComponent } from '@/_components/blocks/Form/SelectField'
import { SignatureFieldComponent } from '@/_components/blocks/Form/SignatureField'
import { StateFieldComponent } from '@/_components/blocks/Form/StateField'
import { SwitchFieldRadioComponent } from '@/_components/blocks/Form/Switch'
import { TextareaFieldComponent } from '@/_components/blocks/Form/TextareaField'
import { TextFieldComponent } from '@/_components/blocks/Form/TextField'
import { TimezoneFieldComponent } from '@/_components/blocks/Form/TimezoneField'
import type { FormField } from '@/_components/blocks/Form/types'
import { UploadFieldComponent } from '@/_components/blocks/Form/UploadField'

export const renderField = (field: FormField, formId?: number) => {
  const key = field.id ?? field.blockType

  switch (field.blockType) {
    case 'formFieldText':
      return (
        <TextFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldTextarea':
      return (
        <TextareaFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldNumber':
      return (
        <NumberFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldEmail':
      return (
        <EmailFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldSelect':
      return (
        <SelectFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldRadio':
      return (
        <RadioFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldCountry':
      return (
        <CountryFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldState':
      return (
        <StateFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldPronouns':
      return (
        <PronounsFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldSignature':
      return (
        <SignatureFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldCheckbox':
      return (
        <CheckboxFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldMessage':
      return (
        <MessageFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldGroup':
      return (
        <GroupFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldTimezone':
      return (
        <TimezoneFieldComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldSwitchRadio':
      return (
        <SwitchFieldRadioComponent
          key={key}
          {...field}
        />
      )
    case 'formFieldUpload':
      return (
        <UploadFieldComponent
          key={key}
          formId={formId}
          {...field}
        />
      )
    default:
      return null
  }
}
