import React from "react"

import { Provider } from 'react-redux'
import Journal from './Journal'

import configureStore from '../lib/journal/configureStore'
const store = configureStore()

class JournalApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Journal name={this.props.name}></Journal>
      </Provider>
    );
  }
}

export default JournalApp
