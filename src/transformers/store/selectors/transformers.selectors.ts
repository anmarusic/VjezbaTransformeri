import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromTransformers from '../reducers/transformers.reducer'

import * as fromGear from './gear.selectors'

import { Transformer } from '../../models/transformer.model'

export const getTransformerState = createSelector(fromFeature.getTransformersStates,
    (state: fromFeature.TransformersState) => state.transformers)
export const getTransformersEntities = createSelector(getTransformerState, fromTransformers.getTransformersEntities)

export const getSelectedTransformer = createSelector(getTransformersEntities, fromRoot.getRouterState, (entities, router): Transformer => {
  return router.state && entities[parseInt(router.state.params.transformerId,10)]
})

export const getFiltratedTransformers = createSelector(getTransformersEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
})

export const getTransformerVisualised = createSelector(getSelectedTransformer,fromGear.getGearEntities,fromGear.getSelectedGear,
  (transformer, gearEntities,selectedGear) => {
    const gear = selectedGear.map(id => gearEntities[id])
    return { ...transformer, gear }
  }
)

export const getAllTransformers = createSelector(getTransformersEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
})

export const getTransformerLoading = createSelector(getTransformerState, fromTransformers.getTransformersLoading)
export const getTransformerLoaded = createSelector(getTransformerState, fromTransformers.getTransformersLoaded)
