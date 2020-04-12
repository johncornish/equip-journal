import moment from 'moment-js'

export const entriesToCollections = entries => entries
  .filter(e => e.collection)
  .map(e => e.collection)

const pageReducer = (acc, e) => {
  if (acc.length === 0) {
    // https://www.ruby-forum.com/t/date-format-and-parsing-to-javascript-date/142276
    const d = Date.parse(e.created_at_js)
    return [
      {
        title: moment(d).format('M-d-YYYY'),
        entries: [e],
      }
    ]
  }
  const lastEntry = acc.pop()
  return [
    ...acc,
    {
      title: lastEntry.title,
      entries: [
        ...lastEntry.entries,
        e,
      ],
    },
  ]
}
export const entriesToPages = entries => entries.reduce(pageReducer, [])
