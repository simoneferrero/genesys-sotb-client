import PropTypes from 'prop-types'

export const weaponData = {
  /** Critical value */
  crit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Amount of damage */
  damage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Encumbrance value */
  encumbrance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /** How many mods can be attached */
  hard_points: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /** Unique identifier */
  id: PropTypes.number,
  /** Any weapon modifications */
  mods: PropTypes.string,
  /** Name of the weapon */
  name: PropTypes.string.isRequired,
  /** Price of new weapon */
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** How far it can reach */
  range: PropTypes.oneOf(['engaged', 'short', 'medium', 'long', 'extreme']),
  /** How rare it is to find it */
  rarity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Whether it's legal or not to have it */
  restricted: PropTypes.bool,
  /** What skill is checked to use the weapon */
  skill: PropTypes.string,
  /** Any modifiers */
  special: PropTypes.string.isRequired,
}

export const weaponType = PropTypes.shape(weaponData)
