import * as fromVehicles from '../actions/vehicles.action'

import { Vehicle } from '../../models/vehicle.model'

export interface VehiclesState {
  data: Vehicle[]
  loaded: boolean
  loading: boolean
}

export const initalState: VehiclesState = {
  data: [],
  loading: false,
  loaded: false
}

export function reducer (state = initalState, action: fromVehicles.VehiclesAction): VehiclesState {
  switch (action.type) {
    case fromVehicles.LOAD_VEHICLES: {
      return {
        ...state,
        loading: true
      }
    }
    case fromVehicles.LOAD_VEHICLES_SUCCESS: {
      const data = action.payload
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      }
    }
    case fromVehicles.LOAD_VEHICLES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }
  return state
}

export const getVehiclesLoading = (state: VehiclesState) => state.loading
export const getVehiclesLoaded = (state: VehiclesState) => state.loaded
export const getAllVehicles = (state: VehiclesState) => state.data
