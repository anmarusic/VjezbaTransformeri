import * as fromTransformers from '../actions/transformers.action'

import { Transformer } from '../../models/transformer.model'

export interface TransformerState {
  entities: {[id: number]: Transformer}
  loaded: boolean
  loading: boolean
  inputedFilter: string
  selectedFaction: string
}

export const initalState: TransformerState = {
  entities: {},
  loading: false,
  loaded: false,
  inputedFilter: '',
  selectedFaction: ''
}

export function reducer (state = initalState, action: fromTransformers.TransformersAction): TransformerState {
  switch (action.type) {
    case fromTransformers.LOAD_TRANSFORMERS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromTransformers.LOAD_FILTRATED_TRANSFORMERS: {
      const transformers = action.payload
      const entities = transformers.reduce((_entities: {[id: number]: Transformer}, _transformer: Transformer) => {
        let factTrue = false
        let nameTrue = false
        if (action.filtratedFaction === '') {
          factTrue = true
        }else {
          if (_transformer.faction === action.filtratedFaction) {
            factTrue = true
          }
        }
        if (action.filtratedName === '') {
          nameTrue = true
        }else {
          if (_transformer.name.toLowerCase().includes(action.filtratedName.toLowerCase())) {
            nameTrue = true
          }
        }
        if (nameTrue && factTrue) {
          return{
            ..._entities,
            [_transformer.id]: _transformer
          }
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
    case fromTransformers.LOAD_TRANSFORMERS_SUCCESS: {
      const transformers = action.payload
      const entities = transformers.reduce((_entities: {[id: number]: Transformer}, _transformer: Transformer) => {
        return{
          ..._entities,
          [_transformer.id]: _transformer
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
    case fromTransformers.LOAD_TRANSFORMERS_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
    case fromTransformers.UPDATE_TRANSFORMER_SUCCESS:
    case fromTransformers.CREATE_TRANSFORMER_SUCCESS: {
      const transformer = action.payload
      const entities = {
        ...state.entities,
        [transformer.id]: transformer
      }
      return {
        ...state,
        entities
      }
    }
    case fromTransformers.REMOVE_TRANSFORMER_SUCCESS: {
      const transformer = action.payload

      const { [transformer.id]: removed, ...entities } = state.entities
      return{
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
