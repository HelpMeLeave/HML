import plugin from 'tailwindcss/plugin'

// Descendant variants for BEM parts (Payload, react-select): `btn-icon:pl-4` → `& .btn__icon`, `btn-[label]:` for anything unlisted
const blocks = {
  btn: ['icon', 'content', 'label'],
  drawer: ['content', 'close', 'blur-bg', 'header'],
  'drawer-action-header': ['title', 'content'],
  popup: ['content'],
  'popup-button-list': ['button', 'disabled'],
  'toolbar-popup': ['button', 'dropdown', 'dropdown-items', 'dropdown-item', 'dropdown-label', 'dropdown-caret'],
  'fixed-toolbar': ['group'],
  'rich-text-lexical': ['wrap', 'label-row'],
  'field-type': ['wrap'],
  'array-field': ['draggable-rows', 'row-header'],
  collapsible: ['toggle-wrap', 'content'],
  'doc-controls': ['wrapper', 'controls', 'controls-wrapper', 'content'],
  'document-fields': ['main', 'fields', 'edit', 'sidebar', 'sidebar-wrap', 'sidebar-fields'],
  rs: ['control', 'menu', 'menu-list', 'option', 'value-container', 'multi-value', 'placeholder'],
}

export default plugin(({ matchVariant }) => {
  for (const [block, elements] of Object.entries(blocks)) {
    matchVariant(block, (el) => `& .${block}__${el}`, {
      values: Object.fromEntries(elements.map((el) => [el, el])),
    })
  }
})
