import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalPage from '../components/JournalPage'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const props = {
    name: 'Test journal',
    journalEntries: [
      {text: 'Test entry text'}
    ]
  }

  const wrapper = shallow(<JournalPage {...props} />)

  return {
    props,
    wrapper
  }
}

describe('JournalPage', () => {
  it('should do something', () => {
    const { wrapper, props } = setup()

    
  })
})
