import { createStore } from 'redux'

const initialState = {
  journalEntries: [
    {text: 'Test journal entry text'}
  ]
}

const rootReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    default:
      return state
  }
}

const configureStore = () => createStore(rootReducer, initialState)
export default configureStore
