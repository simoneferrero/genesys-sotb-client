import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryType } from 'types/criticalInjuries'
import { factionType } from 'types/factions'
import { playerCharacterType } from 'types/playersCharacters'
import { talentType } from 'types/talents'
import { weaponType } from 'types/weapons'

import keyBy from 'lodash/keyBy'

import { Formik } from 'formik'

import InnerForm from './innerForm'

const PCSheet = ({
  addFavor,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterTalent,
  addPlayerCharacterWeapon,
  criticalInjuries,
  factions,
  handleSubmit,
  playerCharacter: { favors, skills, ...playerCharacter },
  talents,
  weapons,
}) => {
  const [editing, setEditing] = useState(false)
  const augmentedHandleSubmit = (values, actions) =>
    handleSubmit(values, { ...actions, setEditing })

  const initialValues = {
    ...playerCharacter,
    deletedCriticalInjuries: {},
    deletedWeapons: {},
    favors: keyBy(favors, 'id'),
    skills: keyBy(skills, 'id'),
    weapons: keyBy(playerCharacter.weapons, 'id'),
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={augmentedHandleSubmit}
      render={(props) => (
        <InnerForm
          addPlayerCharacterCriticalInjury={addPlayerCharacterCriticalInjury}
          addPlayerCharacterTalent={addPlayerCharacterTalent}
          addPlayerCharacterWeapon={addPlayerCharacterWeapon}
          addFavor={addFavor}
          criticalInjuries={criticalInjuries}
          editing={editing}
          factions={factions}
          setEditing={setEditing}
          talents={talents}
          weapons={weapons}
          {...props}
        />
      )}
      validationSchema={InnerForm.validationSchema}
    />
  )
}

PCSheet.propTypes = {
  /** Invoked when adding a favor */
  addFavor: PropTypes.func.isRequired,
  /** Invoked when adding a critical injury */
  addPlayerCharacterCriticalInjury: PropTypes.func.isRequired,
  /** Invoked when adding a talent */
  addPlayerCharacterTalent: PropTypes.func.isRequired,
  /** Invoked when adding a weapon */
  addPlayerCharacterWeapon: PropTypes.func.isRequired,
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
  /** Talents data */
  talents: PropTypes.objectOf(talentType).isRequired,
  /** Weapons' data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
}

export default PCSheet
