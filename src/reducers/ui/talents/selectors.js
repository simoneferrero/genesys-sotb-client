import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const talentsUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('talents'),
)
