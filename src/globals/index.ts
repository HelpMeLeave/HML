import { setGlobalGroup } from '@/_config/_lib'
import { GlobalSettingsGlobalConfig } from '@/globals/GlobalSettings'
import LedgerGlobalConfig from '@/globals/Ledger'
import VolunteerAgreementGlobalConfig from '@/globals/VolunteerAgreement'
import { WizardGlobalConfig } from '@/globals/Wizard'
import type { GlobalConfig } from 'payload'

export const globals: GlobalConfig[] = [
  ...setGlobalGroup('Volunteer Management', [VolunteerAgreementGlobalConfig]),
  ...setGlobalGroup('Finances', [LedgerGlobalConfig]),
  ...setGlobalGroup('Website Settings', [GlobalSettingsGlobalConfig, WizardGlobalConfig]),
]
