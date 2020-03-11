import React from "react"
import PropTypes from "prop-types"
class Journal extends React.Component {
  render () {
    const entries = this.props.journalEntries.map((je, i) => (
      <li key={i}>{je.text}</li>
    ))
    return (
      <React.Fragment>
        <p>
          <strong>Name: </strong>
          {this.props.name}
        </p>
        <ul>
          {entries}
        </ul>
      </React.Fragment>
    );
  }
}

Journal.propTypes = {
  name: PropTypes.string,
  journalEntries: PropTypes.array
};
export default Journal
