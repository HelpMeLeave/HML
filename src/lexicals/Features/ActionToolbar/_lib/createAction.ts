import type { ToolbarActionItem } from '@/lexicals/Features/ActionToolbar/_types'
import { fromCamelCase } from '@/lib/textCasing'

export const createAction = (
  slug: string,
  // opts: Omit<ToolbarActionItem, 'slug' | 'label' | 'isActive'> & {
  opts: Omit<ToolbarActionItem, 'slug' | 'label' | '$isActive'> & {
    label?: string
    $isActive?: ToolbarActionItem['$isActive']
  }
): ToolbarActionItem => {
  const { label, $isActive: isActive, Icon, $isEnabled, onSelect, hideIfDisabled } = opts
  return {
    slug,
    Icon,
    onSelect,
    $isEnabled,
    $isActive: typeof isActive != 'undefined' ? isActive : () => false,
    label: label ? label : fromCamelCase(slug),
    hideIfDisabled: hideIfDisabled ? hideIfDisabled : undefined,
  }
}
