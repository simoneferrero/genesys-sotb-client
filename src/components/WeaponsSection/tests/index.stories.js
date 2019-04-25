import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { skillsById } from 'mocks/skills'
import { weapon1, weapon2, newWeaponResponse } from 'mocks/weapons'

import WeaponsSection from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  onWeaponChange: action('onWeaponChange'),
  skills: fromJS(skillsById).toJS(),
  weapons: [weapon1, weapon2, newWeaponResponse],
}

const renderComponent = (props = {}) => (
  <WeaponsSection {...defaultProps} {...props} />
)

storiesOf('Components/WeaponsSection', module)
  .add('default', () => renderComponent())
  .add('showAdd', () => renderComponent({ showAdd: true }))
  .add('editing', () =>
    renderComponent({
      deletedWeapons: { [newWeaponResponse.id]: true },
      editing: true,
    }),
  )