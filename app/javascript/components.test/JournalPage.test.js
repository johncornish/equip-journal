import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalPage from '../components/JournalPage'
import JournalEntry from '../components/JournalEntry'

Enzyme.configure({ adapter: new Adapter() })

const journalEntries = [
  {id: 13, text: 'Test entry text 1', inCollection: true},
  {text: 'Test entry text 2'},
  {text: 'Test entry text 3'},
]
const setup = entries => {
  const props = {
    title: 'Test page title',
    entries,
  }

  const wrapper = shallow(<JournalPage {...props} />)

  return {
    props,
    wrapper
  }
}

describe('JournalPage', () => {
  it('should display its title and entries', () => {
    const { wrapper, props } = setup(journalEntries)

    expect(wrapper.text().includes('Test page title')).toBe(true)

    expect(wrapper.find(JournalEntry).length).toBe(3)
    expect(wrapper.find(JournalEntry).first().prop('id')).toBe(13)
    expect(wrapper.find(JournalEntry).first().prop('text')).toBe('Test entry text 1')
    expect(wrapper.find(JournalEntry).first().prop('inCollection')).toBe(true)
  })
})
