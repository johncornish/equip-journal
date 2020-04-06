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
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <ul>
              {entryElements}
            </ul>
          </div>
        </div>
      </div>
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
