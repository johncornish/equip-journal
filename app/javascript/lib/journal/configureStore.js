import { createStore } from 'redux'

const defaultState = {
  name: 'thar is kno naem',
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

const configureStore = initialState => createStore(
  rootReducer,
  {
    ...defaultState,
    ...initialState,
  },
)
export default configureStore
