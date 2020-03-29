import { connect } from 'react-redux'

import Journal from '../components/Journal'

const mapStateToProps = state => ({
  tasks: state.tasks,
  journalEntries: state.journalEntries,
})

const mapDispatchToProps = dispatch => ({})

const ControllableJournal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Journal)

export default ControllableJournal
