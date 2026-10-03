import { cx } from 'class-variance-authority'
import { type ClassNameValue, twMerge } from 'tailwind-merge'

type ClassNameKeyValues = ClassNameValue extends string ? Record<ClassNameValue, boolean> : never

export type ClassNameOptions = ClassNameValue | Record<ClassNameKeyValues, boolean>

/**
 * Utility function to combine class names and merge Tailwind CSS classes using CLSX and Tailwind Merge.
 * @param classNames A list of class names to be combined.
 * @returns A single string with merged class names.
 */
export const cn = (...classNames: ClassNameOptions[]) => {
  return twMerge(cx(classNames))
}
