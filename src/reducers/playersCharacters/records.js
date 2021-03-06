import { List, Map, Record } from 'immutable'

import ArchetypeRecord from 'reducers/archetypes/records'
import CareerRecord from 'reducers/careers/records'

const PlayerCharacterRecord = Record({
  archetype: new ArchetypeRecord(),
  archetype_id: null,
  attributes: Map({
    defense: Map({
      melee: 0,
      ranged: 0,
    }),
    soak: 0,
    strain: Map({
      current: 0,
      total: 0,
    }),
    wounds: Map({
      current: 0,
      total: 0,
    }),
  }),
  career: new CareerRecord(),
  career_id: null,
  characteristics: Map({
    agility: 0,
    brawn: 0,
    cunning: 0,
    intellect: 0,
    presence: 0,
    willpower: 0,
  }),
  critical_injuries: Map(),
  equipment: Map({
    armor: '',
    gear: '',
    money: 0,
  }),
  favors: List(),
  id: null,
  motivations: Map({
    strength: Map({
      type: '',
      description: '',
    }),
    flaw: Map({
      type: '',
      description: '',
    }),
    desire: Map({
      type: '',
      description: '',
    }),
    fear: Map({
      type: '',
      description: '',
    }),
  }),
  name: '',
  notes: '',
  player_name: '',
  skills: List(),
  talents: Map(),
  weapons: List(),
  xp: Map({
    available: 0,
    total: 0,
  }),
})

export default PlayerCharacterRecord
