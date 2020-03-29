import React from "react"
import PropTypes from "prop-types"

// <%= render 'journal_entry_form', journal_entry: @journal_entry %>
const JournalEntry = ({id, text, collection}) => (
  <li class={collection ? ' text-muted' : ''}>
    {text} <a href={`/journal_entries/${id}/edit`}>edit</a> <a href="#">delete</a>
  </li>
)

class Journal extends React.Component {
  render () {
    const collectionElements = this.props.collections.map((c, i) => (
      <li>
        <a href="#" key={i}>{c}</a>
      </li>
    ))
    const pageElements = Object.entries(this.props.journalEntriesByCollection).map(([collectionKey, jes]) => (
      <div key={collectionKey} class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{collectionKey}</h5>
            <ul>
              {jes.map((je, i) => (
                <JournalEntry
                  key={i}
                  {...je}
                />
            ))}
            </ul>
          </div>
        </div>
      </div>
    ))
    return (
      <React.Fragment>
        <p>
          <strong>Name: </strong>
          {this.props.name}
        </p>


      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Index</h5>
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
