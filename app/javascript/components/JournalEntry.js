import React from "react"
import PropTypes from "prop-types"
const JournalEntry = ({
  id,
  text,
  inCollection,
}) => (
  <li className={inCollection ? ' text-muted' : ''}>
    {text} <a href={`/journal_entries/${id}/edit`}>edit</a> <a href="#">delete</a>
  </li>
)

JournalEntry.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  inCollection: PropTypes.bool,
};
export default JournalEntry
