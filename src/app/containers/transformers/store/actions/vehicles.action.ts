import { Action } from '@ngrx/store'

import { Vehicle } from '../../models/vehicle.model'

export const LOAD_VEHICLES = '[Transformers] Load Vehicles'
export const LOAD_VEHICLES_FAIL = '[Transformers] Load Vehicles fail'
export const LOAD_VEHICLES_SUCCESS = '[Transformers] Load Vehicles success'

export class LoadVehicles implements Action {
  readonly type = LOAD_VEHICLES
}

export class LoadVehiclesFail implements Action {
  readonly type = LOAD_VEHICLES_FAIL
  constructor (public payload: any) {}
}

export class LoadVehiclesSuccess implements Action {
  readonly type = LOAD_VEHICLES_SUCCESS
  constructor (public payload: any) {}
}

export type VehiclesAction = LoadVehicles | LoadVehiclesFail | LoadVehiclesSuccess
