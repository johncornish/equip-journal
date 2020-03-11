import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Journal from '../components/Journal'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const props = {
    name: 'Test journal',
    journalEntries: [
      {text: 'Test entry text'}
    ]
  }

  const wrapper = shallow(<Journal {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Journal', () => {
  it('should do something', () => {
    const { wrapper, props } = setup()

    expect(wrapper.text().includes('Test journal')).toBe(true)
    expect(wrapper.text().includes('Test entry text')).toBe(true)
  })
})
