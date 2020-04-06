import { connect } from 'react-redux'

import Journal from '../components/Journal'

const entriesToCollections = entries => entries.map(e => e.collection)

const entriesToPages = entries => [
  {
    title: 'The one page for now',
    entries,
  },
]

const mapStateToProps = state => ({
  name: state.name,
  collections: entriesToCollections(state.journalEntries),
  pages: entriesToPages(state.journalEntries),
})

const mapDispatchToProps = dispatch => ({})

const ControllableJournal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Journal)

export default ControllableJournal
