export const deeplyNestKey = (...arr: Array<unknown>): Record<string, unknown> => {
  let duped = [...arr]
  while (duped.length > 1) {
    const sliced = duped.slice(0, -2)
    sliced.push(Object.fromEntries([duped.slice(-2)]))
    duped = sliced
  }

  return duped[0] as Record<string, unknown>
}
