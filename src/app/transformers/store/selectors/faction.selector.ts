import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../store'
import * as fromFeature from '../reducers'
import * as fromFaction from '../reducers/faction.reducer'

import { Faction } from '../../models/faction.model'

export const getFactionState = createSelector(fromFeature.getTransformersStates, (state: fromFeature.TransformersState) => state.faction)
export const getFactionEntities = createSelector(getFactionState, fromFaction.getFactionEntities)
export const getSelectedFaction = createSelector(getFactionState, fromFaction.getSelectedFaction)

export const getAllFaction = createSelector(getFactionEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
})

export const getFactionLoading = createSelector(getFactionState, fromFaction.getFactionLoading)
export const getFactionLoaded = createSelector(getFactionState, fromFaction.getFactionLoaded)
