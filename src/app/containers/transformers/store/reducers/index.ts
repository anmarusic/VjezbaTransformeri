import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromTransformers from './transformers.reducer'
import * as fromVehicles from './vehicles.reducer'
import * as fromFaction from './faction.reducer'
import * as fromGear from './gear.reducer'

export interface TransformersState {
  transformers: fromTransformers.TransformerState
  faction: fromFaction.FactionState
  gear: fromGear.GearState
  vehicles: fromVehicles.VehiclesState
}

export const reducers: ActionReducerMap<TransformersState> = {
  transformers: fromTransformers.reducer,
  faction: fromFaction.reducer,
  gear: fromGear.reducer,
  vehicles: fromVehicles.reducer
}

export const getTransformersStates = createFeatureSelector<TransformersState>('transformers')
