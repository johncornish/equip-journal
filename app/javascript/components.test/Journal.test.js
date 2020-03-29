import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Journal from '../components/Journal'
import JournalPage from '../components/JournalPage'

Enzyme.configure({ adapter: new Adapter() })

const journalEntries1 = [
  {text: 'Test entry text'},
]
const journalEntries2 = [
  {text: 'Test entry text 1'},
  {text: 'Test entry text 2'},
  {text: 'Test entry text 3'},
]
const setup = () => {
  const props = {
    name: 'Test journal',
    collections: [
      'Test collection title 1',
      'Test collection title 2',
    ],
    pages: [
      {
        title: 'Test page title 1',
        entries: journalEntries1,
      },
      {
        title: 'Test page title 2',
        entries: journalEntries2,
      },
    ],
  }

  const wrapper = shallow(<Journal {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Journal', () => {
  it('should display its name and pages', () => {
    const { wrapper, props } = setup()

    expect(wrapper.text().includes('Test journal')).toBe(true)
    
    expect(wrapper.find(JournalPage).length).toBe(2)
    expect(wrapper.find(JournalPage).first().prop('title')).toBe('Test page title 1')
    expect(wrapper.find(JournalPage).first().prop('entries')).toBe(journalEntries1)
  })
})
