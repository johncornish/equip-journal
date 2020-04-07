export const entriesToCollections = entries => entries.map(e => e.collection)

export const entriesToPages = entries => [
  {
    title: 'The one page for now',
    entries,
  },
]
export const entriesToCollections = entries => entries
  .filter(e => e.collection)
  .map(e => e.collection)
