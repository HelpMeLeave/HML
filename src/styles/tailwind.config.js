import plugin from 'tailwindcss/plugin'

const SlotsMatcher = (fn) =>
  fn('slot', (value) => {
    return `&[data-slot="${value}"]`
  })

export default plugin(function ({ matchVariant }) {
  SlotsMatcher(matchVariant)
})
