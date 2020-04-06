import React from "react"
import PropTypes from "prop-types"

import JournalPage from './JournalPage'

const JournalEntry = ({id, text, collection}) => (
  <li className={collection ? ' text-muted' : ''}>
    {text} <a href={`/journal_entries/${id}/edit`}>edit</a> <a href="#">delete</a>
  </li>
)

class Journal extends React.Component {
  render () {
    const collectionElements = this.props.collections.map((c, i) => (
      <li key={i}>
        <a href="#">{c}</a>
      </li>
    ))
    const pageElements = this.props.pages
                          .map((page, i) => (
                            <JournalPage
                              key={i}
                              {...page}
                            />
                          ))
    return (
      <React.Fragment>
        <p>
          <strong>Name: </strong>
          {this.props.name}
        </p>


      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Index</h5>
                <ul id="index">
                  {collectionElements}
                </ul>
              </div>
            </div>
          </div>
          {pageElements}
        </div>
      </div>
    </React.Fragment>
    );
  }
}

Journal.propTypes = {
  name: PropTypes.string,
  journalEntries: PropTypes.array
};
export default Journal
