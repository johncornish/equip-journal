import { connect } from 'react-redux'

import { entriesToPages, entriesToCollections } from '../lib/journal/utils'

import Journal from '../components/Journal'

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
