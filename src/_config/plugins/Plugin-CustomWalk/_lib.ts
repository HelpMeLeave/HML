import type {
  FieldWalkConfig,
  FieldWalkConfigValues,
} from '@/_config/plugins/Plugin-CustomWalk/_types'

export const parseConfigs = (configs: FieldWalkConfig[]) =>
  configs.reduce((config, entry) => {
    Object.keys(entry)
      .sort((a, b) => {
        if (a == 'all') return -1
        else if (b == 'all') return 1
        return a.localeCompare(b)
      })
      .forEach((k) => {
        const key = k as keyof FieldWalkConfig
        const thisEntry = entry[key] as FieldWalkConfigValues<AnySafe>
        if (thisEntry) {
          if (config[key]) {
            config[key].push(...thisEntry)
          } else {
            config[key] = [...thisEntry]
          }
        }
      })

    return config
  }, {} as FieldWalkConfig)
