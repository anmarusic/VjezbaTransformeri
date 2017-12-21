import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromFeature from '../reducers'
import * as fromGear from '../reducers/gear.reducer'

import { Gear } from '../../models/gear.model'

export const getGearState = createSelector(fromFeature.getTransformersStates, (state: fromFeature.TransformersState) => state.gear)
export const getGearEntities = createSelector(getGearState, fromGear.getGearEntities)
export const getSelectedGear = createSelector(getGearState, fromGear.getSelectedGear)

export const getAllGear = createSelector(getGearEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
})

export const getGearLoading = createSelector(getGearState, fromGear.getGearLoading)
export const getGearLoaded = createSelector(getGearState, fromGear.getGearLoaded)
