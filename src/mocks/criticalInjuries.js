import { List } from 'immutable'
import CriticalInjuryrRecord from 'reducers/criticalInjuries/records'

export const criticalInjury1 = {
  id: 'minor_nick',
  name: 'Minor Nick',
  severity: 1,
  effects: 'The target suffers 1 strain.',
  dice_value: '01-05',
  persistent: false,
}
export const criticalInjury2 = {
  id: 'slightly_dazed',
  name: 'Slightly Dazed',
  severity: 2,
  effects: 'The target is disoriented until this Critical Injury is healed.',
  dice_value: '61-65',
  persistent: true,
}
export const criticalInjury3 = {
  id: 'the_end_is_nigh',
  name: 'The End Is Nigh',
  severity: 4,
  effects:
    'The target dies after the last Initiative slot during the next round unless this Critical Injury is healed.',
  dice_value: '141-150',
  persistent: true,
}
export const newPlayerCharacterCriticalInjuryResponse = {
  id: 3,
  critical_injury_id: criticalInjury3.id,
}

export const criticalInjuries = [criticalInjury1, criticalInjury2]
export const criticalInjuriesById = {
  [criticalInjury1.id]: new CriticalInjuryrRecord(criticalInjury1),
  [criticalInjury2.id]: new CriticalInjuryrRecord(criticalInjury2),
}
export const criticalInjuriesAllIds = [criticalInjury1.id, criticalInjury2.id]
export const criticalInjuriesOrdered = List([
  new CriticalInjuryrRecord(criticalInjury1),
  new CriticalInjuryrRecord(criticalInjury2),
])
