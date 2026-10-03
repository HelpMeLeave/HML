import type { FilterOptions } from 'payload'

const equalsPillar: FilterOptions = ({ data }) => ({
  pillar: {
    equals: data.pillar,
  },
})

export const filterOption = {
  equalsPillar,
}
