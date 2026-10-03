export const lastArrayIndex = (arr: unknown[]) => arr.length - 1

export const isLastArrayItem = (item: unknown, arr: unknown[]) => arr[lastArrayIndex(arr)] == item
