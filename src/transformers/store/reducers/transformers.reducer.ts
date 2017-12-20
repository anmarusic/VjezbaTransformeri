import * as fromTransformers from '../actions/transformers.action'

import { Transformer } from '../../models/transformer.model'

export interface TransformerState {
  entities: Transformer[]
  loaded: boolean
  loading: boolean
  selectedFactionFilter: string
  inputedNameFilter: string
  originalEntities: Transformer[]
}

export const initalState: TransformerState = {
  entities: [],
  loading: false,
  loaded: false,
  selectedFactionFilter: '',
  inputedNameFilter: '',
  originalEntities: []
}

export function reducer (state = initalState, action: fromTransformers.TransformersAction): TransformerState {
  switch (action.type) {
    case fromTransformers.UPDATE_FILTER_FACTION: {
      return {
        ...state,
        selectedFactionFilter: action.payload
      }
    }
    case fromTransformers.UPDATE_FILTER_NAME: {
      return{
        ...state,
        inputedNameFilter: action.payload
      }
    }
    case fromTransformers.LOAD_TRANSFORMERS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromTransformers.LOAD_TRANSFORMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: action.payload,
        originalEntities: action.payload
      }
    }
    case fromTransformers.LOAD_TRANSFORMERS_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
    case fromTransformers.REMOVE_TRANSFORMER_SUCCESS: {
      const entities = state.originalEntities.filter(t => t.id !== action.payload.id)
      return{
        ...state,
        entities
      }
    }
    case fromTransformers.FILTER_TRANSFORMERS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromTransformers.FILTER_TRANSFORMERS_SUCCESS: {
      const filteredTransformers = state.originalEntities
      .filter(t => state.selectedFactionFilter ? (t.faction === state.selectedFactionFilter) : true)
      .filter(t => state.inputedNameFilter ? (t.name.toLowerCase().includes(state.inputedNameFilter.toLowerCase())) : true)
      return {
        ...state,
        entities: filteredTransformers
      }
    }
    case fromTransformers.UPDATE_TRANSFORMER_SUCCESS:
    case fromTransformers.CREATE_TRANSFORMER_SUCCESS: {
      const transformer = action.payload
      const entities = {
        ...state.originalEntities,
        [transformer.id]: transformer
      }
      return {
        ...state,
        entities
      }
    }
  }
  return state
}

export const getTransformersLoading = (state: TransformerState) => state.loading
export const getTransformersLoaded = (state: TransformerState) => state.loaded
export const getTransformersEntities = (state: TransformerState) => state.entities
