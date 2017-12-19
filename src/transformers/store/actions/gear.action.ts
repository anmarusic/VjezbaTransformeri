import { Action } from '@ngrx/store'

import { Gear } from '../../models/gear.model'

export const LOAD_GEAR = '[Transformers] Load Gear'
export const LOAD_GEAR_FAIL = '[Transformers] Load Gear fail'
export const LOAD_GEAR_SUCCESS = '[Transformers] Load Gear success'
export const VISUALISE_GEAR = '[Transformers] Visualise Gear'

export class VisualiseGear implements Action {
  readonly type = VISUALISE_GEAR
  constructor (public payload: number[]) {}
}

export class LoadGear implements Action {
  readonly type = LOAD_GEAR
}

export class LoadGearFail implements Action {
  readonly type = LOAD_GEAR_FAIL
  constructor (public payload: any) {}
}

export class LoadGearSuccess implements Action {
  readonly type = LOAD_GEAR_SUCCESS
  constructor (public payload: any) {}
}

export type GearAction = LoadGear | LoadGearFail | LoadGearSuccess | VisualiseGear
