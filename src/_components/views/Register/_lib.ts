import type {
  Field,
  FormAction,
  FormEntry,
  FormEntryData,
} from '@/_components/views/Register/_types'
import z from 'zod'

export const formItems = z.object({
  token: z.uuidv4(),
  username: z.string(),
  email: z.email(),
  password: z
    .object({
      newPassword: z.string().min(8, {
        error: '8 Character Minimim',
      }),
      confirmPassword: z.string().min(8, {
        error: '8 Character Minimim',
      }),
    })
    .refine((args) => args.confirmPassword == args.newPassword, {
      error: 'Passwords do not match',
    }),
  name: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  pronouns: z.string().array(),
  discordHandle: z.string(),
  signature: z.string(),
  date: z.string(),
})

export type FormItemType = z.infer<typeof formItems>

export const formReducer = <F extends Field>(state: FormEntry, action: FormAction<F>) => {
  const newState = { ...state }
  newState.errors = {}
  newState.data[action.field] = action.value

  const parse = formItems.safeParse(newState.data)
  if (parse.success) {
    return newState
  } else {
    newState.errors = z.treeifyError(parse.error).properties
    const errorKeys = Object.keys(newState.errors ?? {})
    errorKeys.forEach((ea) => {
      if (ea in newState.data) {
        const thisField = newState.data[ea as keyof FormEntry['data']]
        if (thisField == null || thisField == '') {
          delete newState.errors![ea as keyof FormEntry['errors']]
        }
        if (ea == 'password') {
          if (
            (thisField as FormEntryData['password']).confirmPassword == ''
            && (thisField as FormEntryData['password']).newPassword == ''
          )
            delete newState.errors?.password
        }
      }
    })
  }

  return newState
}
