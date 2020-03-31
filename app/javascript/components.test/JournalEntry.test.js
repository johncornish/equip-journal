import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalEntry from '../components/JournalEntry'

Enzyme.configure({ adapter: new Adapter() })

const setup = (inCollection = false) => {
  const props = {
    id: 47,
    text: 'Test entry text',
    inCollection,
  }

  const wrapper = shallow(<JournalEntry {...props} />)

  return {
    props,
    wrapper
  }
}

describe('JournalEntry', () => {
  it('should display its text, an edit link, and a delete link', () => {
    const { wrapper, props } = setup()

    expect(wrapper.text().includes('Test entry text')).toBe(true)
    expect(wrapper.hasClass('text-muted')).toBe(false)
    expect(wrapper.find('a[children="edit"]').prop('href')).toBe('/journal_entries/47/edit')
    expect(wrapper.text().includes('delete')).toBe(true)
  })

  it("should look different if it's also in a collection", () => {
    const { wrapper, props } = setup(true)
    expect(wrapper.hasClass('text-muted')).toBe(true)
  })
})
