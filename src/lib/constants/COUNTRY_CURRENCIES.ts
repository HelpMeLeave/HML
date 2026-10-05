import type { CountryISO } from '@/payload-types'

export const CURRENCIES: Record<
  CountryISO,
  {
    name: string
    symbol: string
  }
> = {
  AED: {
    name: 'United Arab Emirates Dirham',
    symbol: 'د.إ',
  },
  AFN: {
    name: 'Afghan Afghani',
    symbol: '؋',
  },
  ALL: {
    name: 'Albanian Lek',
    symbol: 'L',
  },
  AMD: {
    name: 'Armenian Dram',
    symbol: '֏',
  },
  AOA: {
    name: 'Angolan Kwanza',
    symbol: 'Kz',
  },
  ARS: {
    name: 'Argentine Peso',
    symbol: '$',
  },
  AUD: {
    name: 'Australian Dollar',
    symbol: '$',
  },
  AZN: {
    name: 'Azerbaijani Manat',
    symbol: '₼',
  },
  BAM: {
    name: 'Bosnia and Herzegovina Convertible Mark',
    symbol: 'KM',
  },
  BBD: {
    name: 'Barbadian Dollar',
    symbol: '$',
  },
  BDT: {
    name: 'Bangladeshi Taka',
    symbol: '৳',
  },
  BGN: {
    name: 'Bulgarian Lev',
    symbol: 'лв',
  },
  BHD: {
    name: 'Bahraini Dinar',
    symbol: '.د.ب',
  },
  BIF: {
    name: 'Burundian Franc',
    symbol: 'Fr',
  },
  BND: {
    name: 'Brunei Dollar',
    symbol: '$',
  },
  BOB: {
    name: 'Bolivian Boliviano',
    symbol: 'Bs.',
  },
  BRL: {
    name: 'Brazilian Real',
    symbol: 'R$',
  },
  BSD: {
    name: 'Bahamian Dollar',
    symbol: '$',
  },
  BTN: {
    name: 'Bhutanese Ngultrum',
    symbol: 'Nu.',
  },
  BWP: {
    name: 'Botswana Pula',
    symbol: 'P',
  },
  BYN: {
    name: 'Belarusian Ruble',
    symbol: 'Br',
  },
  BZD: {
    name: 'Belize Dollar',
    symbol: '$',
  },
  CAD: {
    name: 'Canadian Dollar',
    symbol: '$',
  },
  CDF: {
    name: 'Congolese Franc',
    symbol: 'FC',
  },
  CHF: {
    name: 'Swiss Franc',
    symbol: 'Fr',
  },
  CKD: {
    name: 'Cook Islands Dollar',
    symbol: '$',
  },
  CLP: {
    name: 'Chilean Peso',
    symbol: '$',
  },
  CNY: {
    name: 'Chinese Yuan',
    symbol: '¥',
  },
  COP: {
    name: 'Colombian Peso',
    symbol: '$',
  },
  CRC: {
    name: 'Costa Rican Colón',
    symbol: '₡',
  },
  CUC: {
    name: 'Cuban Convertible Peso',
    symbol: '$',
  },
  CUP: {
    name: 'Cuban Peso',
    symbol: '$',
  },
  CVE: {
    name: 'Cape Verdean Escudo',
    symbol: 'Esc',
  },
  CZK: {
    name: 'Czech Koruna',
    symbol: 'Kč',
  },
  DJF: {
    name: 'Djiboutian Franc',
    symbol: 'Fr',
  },
  DKK: {
    name: 'Danish Krone',
    symbol: 'kr',
  },
  DOP: {
    name: 'Dominican Peso',
    symbol: '$',
  },
  DZD: {
    name: 'Algerian Dinar',
    symbol: 'دج',
  },
  EGP: {
    name: 'Egyptian Pound',
    symbol: '£',
  },
  ERN: {
    name: 'Eritrean Nakfa',
    symbol: 'Nfk',
  },
  ETB: {
    name: 'Ethiopian Birr',
    symbol: 'Br',
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
  },
  FJD: {
    name: 'Fijian Dollar',
    symbol: '$',
  },
  FKP: {
    name: 'Falkland Islands Pound',
    symbol: '£',
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
  },
  GEL: {
    name: 'lari',
    symbol: '₾',
  },
  GHS: {
    name: 'Ghanaian Cedi',
    symbol: '₵',
  },
  GMD: {
    name: 'dalasi',
    symbol: 'D',
  },
  GNF: {
    name: 'Guinean Franc',
    symbol: 'Fr',
  },
  GTQ: {
    name: 'Guatemalan Quetzal',
    symbol: 'Q',
  },
  GYD: {
    name: 'Guyanese Dollar',
    symbol: '$',
  },
  HNL: {
    name: 'Honduran Lempira',
    symbol: 'L',
  },
  HTG: {
    name: 'Haitian Gourde',
    symbol: 'G',
  },
  HUF: {
    name: 'Hungarian Forint',
    symbol: 'Ft',
  },
  IDR: {
    name: 'Indonesian Rupiah',
    symbol: 'Rp',
  },
  ILS: {
    name: 'Israeli New Shekel',
    symbol: '₪',
  },
  INR: {
    name: 'Indian Rupee',
    symbol: '₹',
  },
  IQD: {
    name: 'Iraqi Dinar',
    symbol: 'ع.د',
  },
  IRR: {
    name: 'Iranian Rial',
    symbol: '﷼',
  },
  ISK: {
    name: 'Icelandic Króna',
    symbol: 'kr',
  },
  JMD: {
    name: 'Jamaican Dollar',
    symbol: '$',
  },
  JOD: {
    name: 'Jordanian Dinar',
    symbol: 'JD',
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
  },
  KES: {
    name: 'Kenyan Shilling',
    symbol: 'Sh',
  },
  KGS: {
    name: 'Kyrgyzstani Som',
    symbol: 'с',
  },
  KHR: {
    name: 'Cambodian Riel',
    symbol: '៛',
  },
  KID: {
    name: 'Kiribati Dollar',
    symbol: '$',
  },
  KMF: {
    name: 'Comorian Franc',
    symbol: 'Fr',
  },
  KPW: {
    name: 'North Korean Won',
    symbol: '₩',
  },
  KRW: {
    name: 'South Korean Won',
    symbol: '₩',
  },
  KWD: {
    name: 'Kuwaiti Dinar',
    symbol: 'د.ك',
  },
  KYD: {
    name: 'Cayman Islands Dollar',
    symbol: '$',
  },
  KZT: {
    name: 'Kazakhstani Tenge',
    symbol: '₸',
  },
  LAK: {
    name: 'Lao Kip',
    symbol: '₭',
  },
  LBP: {
    name: 'Lebanese Pound',
    symbol: 'ل.ل',
  },
  LKR: {
    name: 'Sri Lankan Rupee',
    symbol: 'Rs රු',
  },
  LRD: {
    name: 'Liberian Dollar',
    symbol: '$',
  },
  LSL: {
    name: 'Lesotho Loti',
    symbol: 'L',
  },
  LYD: {
    name: 'Libyan Dinar',
    symbol: 'ل.د',
  },
  MAD: {
    name: 'Moroccan Dirham',
    symbol: 'د.م.',
  },
  MDL: {
    name: 'Moldovan Leu',
    symbol: 'L',
  },
  MGA: {
    name: 'Malagasy Ariary',
    symbol: 'Ar',
  },
  MKD: {
    name: 'denar',
    symbol: 'den',
  },
  MMK: {
    name: 'Burmese Kyat',
    symbol: 'Ks',
  },
  MNT: {
    name: 'Mongolian Tögrög',
    symbol: '₮',
  },
  MRU: {
    name: 'Mauritanian Ouguiya',
    symbol: 'UM',
  },
  MUR: {
    name: 'Mauritian Rupee',
    symbol: '₨',
  },
  MVR: {
    name: 'Maldivian Rufiyaa',
    symbol: '.ރ',
  },
  MWK: {
    name: 'Malawian Kwacha',
    symbol: 'MK',
  },
  MXN: {
    name: 'Mexican Peso',
    symbol: '$',
  },
  MYR: {
    name: 'Malaysian Ringgit',
    symbol: 'RM',
  },
  MZN: {
    name: 'Mozambican Metical',
    symbol: 'MT',
  },
  NAD: {
    name: 'Namibian Dollar',
    symbol: '$',
  },
  NGN: {
    name: 'Nigerian Naira',
    symbol: '₦',
  },
  NIO: {
    name: 'Nicaraguan Córdoba',
    symbol: 'C$',
  },
  NOK: {
    name: 'Norwegian Krone',
    symbol: 'kr',
  },
  NPR: {
    name: 'Nepalese Rupee',
    symbol: '₨',
  },
  NZD: {
    name: 'New Zealand Dollar',
    symbol: '$',
  },
  OMR: {
    name: 'Omani Rial',
    symbol: 'ر.ع.',
  },
  PAB: {
    name: 'Panamanian Balboa',
    symbol: 'B/.',
  },
  PEN: {
    name: 'Peruvian Sol',
    symbol: 'S/',
  },
  PGK: {
    name: 'Papua New Guinean Kina',
    symbol: 'K',
  },
  PHP: {
    name: 'Philippine Peso',
    symbol: '₱',
  },
  PKR: {
    name: 'Pakistani Rupee',
    symbol: '₨',
  },
  PLN: {
    name: 'Polish Złoty',
    symbol: 'zł',
  },
  PYG: {
    name: 'Paraguayan Guaraní',
    symbol: '₲',
  },
  QAR: {
    name: 'Qatari Riyal',
    symbol: 'ر.ق',
  },
  RON: {
    name: 'Romanian Leu',
    symbol: 'lei',
  },
  RSD: {
    name: 'Serbian Dinar',
    symbol: 'дин.',
  },
  RUB: {
    name: 'Russian Ruble',
    symbol: '₽',
  },
  RWF: {
    name: 'Rwandan Franc',
    symbol: 'Fr',
  },
  SAR: {
    name: 'Saudi Riyal',
    symbol: 'ر.س',
  },
  SBD: {
    name: 'Solomon Islands Dollar',
    symbol: '$',
  },
  SCR: {
    name: 'Seychellois Rupee',
    symbol: '₨',
  },
  SDG: {
    name: 'Sudanese Pound',
    symbol: 'ج.س',
  },
  SEK: {
    name: 'Swedish Krona',
    symbol: 'kr',
  },
  SGD: {
    name: 'Singapore Dollar',
    symbol: '$',
  },
  SLE: {
    name: 'Leone',
    symbol: 'Le',
  },
  SOS: {
    name: 'Somali Shilling',
    symbol: 'Sh',
  },
  SRD: {
    name: 'Surinamese Dollar',
    symbol: '$',
  },
  SSP: {
    name: 'South Sudanese Pound',
    symbol: '£',
  },
  STN: {
    name: 'São Tomé and Príncipe Dobra',
    symbol: 'Db',
  },
  SYP: {
    name: 'Syrian Pound',
    symbol: '£',
  },
  SZL: {
    name: 'Swazi Lilangeni',
    symbol: 'L',
  },
  THB: {
    name: 'Thai Baht',
    symbol: '฿',
  },
  TJS: {
    name: 'Tajikistani Somoni',
    symbol: 'ЅМ',
  },
  TMT: {
    name: 'Turkmenistan Manat',
    symbol: 'm',
  },
  TND: {
    name: 'Tunisian Dinar',
    symbol: 'د.ت',
  },
  TOP: {
    name: 'Tongan Paʻanga',
    symbol: 'T$',
  },
  TRY: {
    name: 'Turkish Lira',
    symbol: '₺',
  },
  TTD: {
    name: 'Trinidad and Tobago Dollar',
    symbol: '$',
  },
  TVD: {
    name: 'Tuvaluan Dollar',
    symbol: '$',
  },
  TWD: {
    name: 'New Taiwan Dollar',
    symbol: '$',
  },
  TZS: {
    name: 'Tanzanian Shilling',
    symbol: 'Sh',
  },
  UAH: {
    name: 'Ukrainian Hryvnia',
    symbol: '₴',
  },
  UGX: {
    name: 'Ugandan Shilling',
    symbol: 'Sh',
  },
  USD: {
    name: 'United States Dollar',
    symbol: '$',
  },
  UYU: {
    name: 'Uruguayan Peso',
    symbol: '$',
  },
  UZS: {
    name: 'Uzbekistani Soʻm',
    symbol: "so'm",
  },
  VES: {
    name: 'Venezuelan Bolívar Soberano',
    symbol: 'Bs.S.',
  },
  VND: {
    name: 'Vietnamese Dồng',
    symbol: '₫',
  },
  VUV: {
    name: 'Vanuatu Vatu',
    symbol: 'Vt',
  },
  WST: {
    name: 'Samoan Tālā',
    symbol: 'T',
  },
  XAF: {
    name: 'Central African CFA Franc',
    symbol: 'Fr',
  },
  XCD: {
    name: 'Eastern Caribbean Dollar',
    symbol: '$',
  },
  XOF: {
    name: 'West African CFA Franc',
    symbol: 'Fr',
  },
  XPF: {
    name: 'CFP Franc',
    symbol: '₣',
  },
  YER: {
    name: 'Yemeni Rial',
    symbol: '﷼',
  },
  ZAR: {
    name: 'South African Rand',
    symbol: 'R',
  },
  ZMW: {
    name: 'Zambian Kwacha',
    symbol: 'ZK',
  },
  ZWL: {
    name: 'Zimbabwean Dollar',
    symbol: '$',
  },
}
