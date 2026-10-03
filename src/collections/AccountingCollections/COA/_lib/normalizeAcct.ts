export const normalizeAcct = (acct: number | string) => {
  const thisAcct = String(acct).replace('-', '').slice(0, 7).padEnd(7, '0')

  return {
    toString: () => [thisAcct.slice(0, 4), thisAcct.slice(4)].join('-'),
    toNumber: () => Number(thisAcct),
  }
}
