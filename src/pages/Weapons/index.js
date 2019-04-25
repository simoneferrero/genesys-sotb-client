import { connect } from 'react-redux'

// Selectors
import { authenticationSelector } from 'reducers/authentication/selectors'
import { weaponsByIdSelector } from 'reducers/weapons/selectors'
import { skillsByIdSelector } from 'reducers/skills/selectors'
import { weaponsUiSelector } from 'reducers/ui/weapons/selectors'
import { skillsUiSelector } from 'reducers/ui/skills/selectors'

// Actions
import { getAuthInfo } from 'actions/authentication'
import { getSkills } from 'actions/skills'
import { getWeapons, addWeapon } from 'actions/weapons'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Home from './component'

const mapStateToProps = (state) => ({
  authInfo: authenticationSelector(state),
  skills: skillsByIdSelector(state),
  skillsUi: skillsUiSelector(state),
  weapons: weaponsByIdSelector(state),
  weaponsUi: weaponsUiSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  addWeapon: (weapon, actions) => dispatch(addWeapon(weapon, actions)),
  getAuthInfo: () => dispatch(getAuthInfo()),
  getSkills: () => dispatch(getSkills()),
  getWeapons: () => dispatch(getWeapons()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Home))