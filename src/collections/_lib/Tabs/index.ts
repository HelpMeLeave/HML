import type {
  Field,
  NamedTab as PayloadNamedTab,
  Tab as PayloadTab,
  TabsField,
  UnnamedTab,
} from 'payload'

export const Tab = (title: string, fields: Field[]) => ({
  named: (opts?: Omit<PayloadNamedTab, 'name' | 'fields'>): PayloadNamedTab => ({
    fields,
    name: title,
    ...opts,
  }),
  field: (opts?: Omit<UnnamedTab, 'label' | 'fields'>): PayloadTab => ({
    fields,
    label: title,
    ...opts,
  }),
})

export const Tabs = (...tabs: PayloadTab[]) => ({
  field: (): TabsField => ({ type: 'tabs', tabs }),
  opts: (opts: Omit<TabsField, 'type' | 'tabs'>): TabsField => ({
    type: 'tabs',
    tabs,
    ...opts,
  }),
})
