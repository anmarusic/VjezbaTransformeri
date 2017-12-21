import * as fromGear from '../actions/gear.action'

import { Gear } from '../../models/gear.model'

export interface GearState {
  entities: {[id: number]: Gear}
  loaded: boolean
  loading: boolean
  selectedGear: number[]
}

export const initalState: GearState = {
  entities: {},
  loading: false,
  loaded: false,
  selectedGear: []
}

export function reducer (state = initalState, action: fromGear.GearAction): GearState {
  switch (action.type) {
    case fromGear.VISUALISE_GEAR: {
      const selectedGear = action.payload
      return {
        ...state,
        selectedGear
      }
    }
    case fromGear.LOAD_GEAR: {
      return {
        ...state,
        loading: true
      }
    }
    case fromGear.LOAD_GEAR_SUCCESS: {
      const gear = action.payload
      const entities = gear.reduce((_entities: {[id: number]: Gear}, _gear: Gear) => {
        return{
          ..._entities,
          [_gear.id]: _gear
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
    case fromGear.LOAD_GEAR_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }
  return state
}

export const getGearLoading = (state: GearState) => state.loading
export const getGearLoaded = (state: GearState) => state.loaded
export const getGearEntities = (state: GearState) => state.entities
export const getSelectedGear = (state: GearState) => state.selectedGear
