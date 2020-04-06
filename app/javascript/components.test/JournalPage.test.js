import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalPage, { sortEntries } from '../components/JournalPage'
import JournalEntry from '../components/JournalEntry'

Enzyme.configure({ adapter: new Adapter() })

const journalEntries = [
  {id: 13, text: 'Test entry text 1', inCollection: true},
  {text: 'Test entry text 2'},
  {text: 'Test entry text 3'},
]
const journalEntriesWithTasks = [
  {text: 'Test entry text 1', isTask: null},
  {text: 'Test entry text 2', isTask: false},
  {text: 'Test entry text 3', isTask: true},
  {text: 'Test entry text 4'},
  {text: 'Test entry text 5', isTask: true},
  {text: 'Test entry text 6', isTask: false},
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

  it('should display tasks at the top before any other entries', () => {
    const { wrapper, props } = setup(journalEntriesWithTasks)
    const expectedTexts = [
      'Test entry text 3',
      'Test entry text 5',
      'Test entry text 1',
      'Test entry text 2',
      'Test entry text 4',
      'Test entry text 6',
    ]

    expect(wrapper.find(JournalEntry).map((je, i) => (je.prop('text')))).toStrictEqual(expectedTexts)
  })
})

describe('sortEntries', () => {
  it('should sort tasks before all falsey isTask values', () => {
    expect(sortEntries([
      {text: 'Test entry text 1', isTask: null},
      {text: 'Test entry text 2'},
      {text: 'Test entry text 3', isTask: undefined},
      {text: 'Test entry text 4', isTask: false},
      {text: 'Test entry text 5', isTask: true},
      {text: 'Test entry text 6', isTask: false},
    ]).map(e => e.text)).toStrictEqual([
      'Test entry text 5',
      'Test entry text 1',
      'Test entry text 2',
      'Test entry text 3',
      'Test entry text 4',
      'Test entry text 6',
    ])
  })

  it('should otherwise preserve entry order', () => {
    expect(sortEntries([
      {text: 'Test entry text 1', isTask: false},
      {text: 'Test entry text 2', isTask: false},
      {text: 'Test entry text 3', isTask: true},
      {text: 'Test entry text 4', isTask: true},
      {text: 'Test entry text 5', isTask: false},
    ]).map(e => e.text)).toStrictEqual([
      'Test entry text 3',
      'Test entry text 4',
      'Test entry text 1',
      'Test entry text 2',
      'Test entry text 5',
    ])
  })
})
