import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Component from '../components/Component'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const props = {
  }

  const wrapper = shallow(<Component {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Component', () => {
  it('should do something', () => {
    const { wrapper, props } = setup()
  })
})
