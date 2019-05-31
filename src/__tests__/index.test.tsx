import React from 'react';
import { mount } from 'enzyme';
import ReactAnsi from '..';

describe('react-ansi', () => {
  it('should remnder', () => {
    const wrapper = mount(<ReactAnsi log="test" />);
    expect(wrapper);
  });
});
