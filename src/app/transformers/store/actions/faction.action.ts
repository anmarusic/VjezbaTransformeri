import { Action } from '@ngrx/store'

import { Faction } from '../../models/faction.model'

export const LOAD_FACTION = '[Transformers] Load Faction'
export const LOAD_FACTION_FAIL = '[Transformers] Load Faction fail'
export const LOAD_FACTION_SUCCESS = '[Transformers] Load Faction success'

export class LoadFaction implements Action {
  readonly type = LOAD_FACTION
}

export class LoadFactionFail implements Action {
  readonly type = LOAD_FACTION_FAIL
  constructor (public payload: any) {}
}

export class LoadFactionSuccess implements Action {
  readonly type = LOAD_FACTION_SUCCESS
  constructor (public payload: any) {}
}

export type FactionAction = LoadFaction | LoadFactionFail | LoadFactionSuccess
