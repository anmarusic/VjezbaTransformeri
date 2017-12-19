import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromVehicles from '../reducers/vehicles.reducer'

import { Vehicle } from '../../models/vehicle.model'

export const getVehicleState = createSelector(fromFeature.getTransformersStates,
    (state: fromFeature.TransformersState) => state.vehicles)

export const getAllVehicles = createSelector(getVehicleState, fromVehicles.getAllVehicles)

export const getVehiclesLoading = createSelector(getVehicleState, fromVehicles.getVehiclesLoading)
export const getVehiclesLoaded = createSelector(getVehicleState, fromVehicles.getVehiclesLoaded)
