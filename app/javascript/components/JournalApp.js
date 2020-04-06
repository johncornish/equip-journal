import React from "react"

import { Provider } from 'react-redux'
import Journal from './Journal'

import configureStore from '../lib/journal/configureStore'
// const store = configureStore()

import ControllableJournal from '../containers/ControllableJournal'

class JournalApp extends React.Component {
  render () {
    return (
      <Provider store={configureStore(this.props)}>
        <ControllableJournal />
      </Provider>
    );
  }
}

export default JournalApp
