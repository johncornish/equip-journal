import moment from 'moment-js'

export const entriesToCollections = entries => entries
  .filter(e => e.collection)
  .map(e => e.collection)

const titlesFromEntry = entry => {
  const titles = []
  const d = Date.parse(entry.created_at_js)
  titles.push(moment(d).format('M-d-YYYY'))

  if (entry.collection) {
    titles.push(entry.collection)
  }

  return titles
}

const sortByCreationTime = (a, b) => {
  const aDate = Date.parse(a.created_at_js)
  const bDate = Date.parse(b.created_at_js)
  return aDate - bDate
}
export const entriesToPages = entries => {
  const sortedEntries = entries.sort(sortByCreationTime)
  let pages = []
  for (let e of sortedEntries) {
    const pageTitles = titlesFromEntry(e)
    for (let t of pageTitles) {
      const pageIndex = pages.findIndex(page => page.title === t)
      if (pageIndex === -1) {
        pages.push({
          title: t,
          entries: [e],
        })
      } else {
        pages[pageIndex].entries.push(e)
      }
    }
  }

  return pages
}
