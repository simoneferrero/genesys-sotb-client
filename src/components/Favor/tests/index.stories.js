import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { favor1, favor2 } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  favor: favor1,
  setAdding: action('setAdding'),
}

const renderComponent = (props = {}) => <Favor {...defaultProps} {...props} />

storiesOf('Components/Favor', module)
  .add('default', () => renderComponent())
  .add('completed', () => {
    const props = {
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('adding', () => {
    const props = {
      adding: true,
      favor: undefined,
    }
    return renderComponent(props)
  })