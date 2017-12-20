import * as fromFaction from '../actions/faction.action'

import { Faction } from '../../models/faction.model'

export interface FactionState {
  entities: {[id: number]: Faction}
  loaded: boolean
  loading: boolean
  selectedFaction: number[]
}

export const initalState: FactionState = {
  entities: {},
  loading: false,
  loaded: false,
  selectedFaction: []
}

export function reducer (state = initalState, action: fromFaction.FactionAction): FactionState {
  switch (action.type) {
    case fromFaction.LOAD_FACTION: {
      return {
        ...state,
        loading: true
      }
    }
    case fromFaction.LOAD_FACTION_SUCCESS: {
      const faction = action.payload
      const entities = faction.reduce((_entities: {[id: number]: Faction}, _faction: Faction) => {
        return{
          ..._entities,
          [_faction.id]: _faction
        }
      },
        {
          ...state.entities
        })
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      }
    }
    case fromFaction.LOAD_FACTION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }
  return state
}

export const getFactionLoading = (state: FactionState) => state.loading
export const getFactionLoaded = (state: FactionState) => state.loaded
export const getFactionEntities = (state: FactionState) => state.entities
export const getSelectedFaction = (state: FactionState) => state.selectedFaction
