import React from "react"
import PropTypes from "prop-types"

import JournalEntry from './JournalEntry'

class JournalPage extends React.Component {
  render () {
    const entryElements = sortEntries(this.props.entries).map((e, i) => (
      <JournalEntry
        key={i}
        {...e}
      />
    ))
    return (
      <React.Fragment>
        Title: {this.props.title}
        {entryElements}
      </React.Fragment>
    );
  }
}

JournalPage.propTypes = {
  title: PropTypes.string,
  entries: PropTypes.array
};
export default JournalPage

export const sortEntries = entries => entries.sort((a, b) => {
  if (a.isTask && !b.isTask) {
    return -1
  }

  return 0
})
