import React from "react"
import PropTypes from "prop-types"
class JournalPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        Title: {this.props.title}
        Sections: {this.props.sections}
      </React.Fragment>
    );
  }
}

JournalPage.propTypes = {
  title: PropTypes.string,
  sections: PropTypes.array
};
export default JournalPage
