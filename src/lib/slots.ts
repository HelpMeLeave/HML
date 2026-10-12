/** Data attribute vocabulary. See docs/data-attributes.md. */

/** Inner parts of a component. */
export type Slot =
  | 'header'
  | 'eyebrow'
  | 'heading'
  | 'subtitle'
  | 'content'
  | 'text'
  | 'media'
  | 'icon'
  | 'actions'
  | 'footer'
  | 'label'
  | 'control'
  | 'description'
  | 'error'

/** Component roots, named after the component. */
export type RootSlot =
  'section' | 'subsection' | 'section-cover' | 'page' | 'announcement' | 'admin-bar' | 'field'

/** `data-variant` for headings and the section/subsection containers that hold them. */
export type HeadingVariant = 'page' | 'section' | 'subsection' | 'minor'

export type State = 'open' | 'closed' | 'active' | 'inactive' | 'selected' | 'disabled'

export const toState = (open: boolean): State => (open ? 'open' : 'closed')
