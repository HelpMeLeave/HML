export const MIN_MAX = {
  MAX_AMOUNT: 100000,
  MIN_AMOUNT: 100,
}

export const CURRENCIES = {
  eur: {
    symbol: '€',
    label: 'EUR',
    presets: [1000, 2500, 5000, 10000],
    fixedFee: 25,
  },
  usd: {
    symbol: '$',
    label: 'USD',
    presets: [1000, 2500, 5000, 10000],
    fixedFee: 30,
  },
  gbp: {
    symbol: '£',
    label: 'GBP',
    presets: [1000, 2500, 5000, 10000],
    fixedFee: 20,
  },
  cad: {
    symbol: 'CA$',
    label: 'CAD',
    presets: [1500, 3500, 7000, 14000],
    fixedFee: 30,
  },
  aud: {
    symbol: 'A$',
    label: 'AUD',
    presets: [1500, 3500, 7000, 14000],
    fixedFee: 30,
  },
} as const
