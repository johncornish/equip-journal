import React from "react"
import PropTypes from "prop-types"

// <%= render 'journal_entry_form', journal_entry: @journal_entry %>
const JournalEntry = ({id, text, collection}) => (
  <li className={collection ? ' text-muted' : ''}>
    {text} <a href={`/journal_entries/${id}/edit`}>edit</a> <a href="#">delete</a>
  </li>
)

const JournalPage = ({title, entries}) => (
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <ul>
          {entries.map((entry, i) => (
            <JournalEntry
              key={i}
              {...entry}
            />
        ))}
        </ul>
      </div>
    </div>
  </div>
)

class Journal extends React.Component {
  render () {
    const collectionElements = this.props.collections.map((c, i) => (
      <li key={i}>
        <a href="#">{c}</a>
      </li>
    ))
    const pageElements = Object
                          .entries(this.props.journalEntriesByCollection)
                          .map(([collectionKey, jes]) => (
                            <JournalPage
                              key={collectionKey}
                              title={collectionKey}
                              entries={jes}
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
