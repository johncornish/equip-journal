export const entriesToCollections = entries => entries.map(e => e.collection)

export const entriesToPages = entries => [
  {
    title: 'The one page for now',
    entries,
  },
]
