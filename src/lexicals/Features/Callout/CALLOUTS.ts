export const CALLOUTS = {
  'case-study': 'callout-color-purple-500/purple-300 before:[content:"Case_study"]',
  note: 'callout-color-slate-500/slate-300 before:[content:"Note"]',
  urgent: 'callout-color-poppy-500/poppy-300 before:[content:"Urgent"]',
  tip: 'callout-color-slate-500/slate-300 before:[content:"Good_to_know"]',
}

export const getCalloutData = (key: CALLOUT_KEYS) => ({
  className: CALLOUTS[key],
  label: (CALLOUTS[key].match(/\[content:"([^"]+")]/) ?? ['', ''])[1],
})

export type CALLOUT_KEYS = Keys<typeof CALLOUTS>
