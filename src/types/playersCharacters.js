import PropTypes from 'prop-types'
import { archetypeType } from './archetypes'
import { careerType } from './careers'
import { characterCriticalInjuryType } from './criticalInjuries'
import { equipmentType } from './equipment'
import { favorType } from './favors'
import { motivationsType } from './motivations'
import { skillType } from './skills'
import { weaponType } from './weapons'

export const playerCharacterSummaryData = {
  /** The character's archetype ID */
  archetype_id: PropTypes.string,
  /** The character's archetype */
  archetype: archetypeType.isRequired,
  /** Information on the character's attributes */
  attributes: PropTypes.shape({
    defense: PropTypes.shape({
      melee: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      ranged: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    soak: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    strain: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      total: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    wounds: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      total: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
  }).isRequired,
  /** The character's career ID */
  career_id: PropTypes.string,
  /** The character's career */
  career: careerType.isRequired,
  /** Information on the character's characteristics */
  characteristics: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    brawn: PropTypes.number.isRequired,
    cunning: PropTypes.number.isRequired,
    intellect: PropTypes.number.isRequired,
    presence: PropTypes.number.isRequired,
    willpower: PropTypes.number.isRequired,
  }).isRequired,
  /** Character's critical injuries */
  critical_injuries: PropTypes.objectOf(characterCriticalInjuryType).isRequired,
  /** Character's unique identifier */
  id: PropTypes.number.isRequired,
  /** Character's name */
  name: PropTypes.string.isRequired,
  /** Player's name */
  player_name: PropTypes.string.isRequired,
}
export const playerCharacterSummaryType = PropTypes.shape({
  ...playerCharacterSummaryData,
})

export const playerCharacterData = {
  ...playerCharacterSummaryData,
  equipment: equipmentType.isRequired,
  favors: PropTypes.arrayOf(favorType).isRequired,
  motivations: motivationsType.isRequired,
  notes: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(skillType).isRequired,
  weapons: PropTypes.arrayOf(weaponType).isRequired,
}
export const playerCharacterType = PropTypes.shape({
  ...playerCharacterData,
})
