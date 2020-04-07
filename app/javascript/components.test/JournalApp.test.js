import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalApp from '../components/JournalApp'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const props = {}

  const wrapper = mount(<JournalApp {...props} />)

  return {
    props,
    wrapper
  }
}

describe('JournalApp', () => {
  it('should render', () => {
    const { wrapper, props } = setup()
    expect(wrapper).toBeDefined()
  })
})
