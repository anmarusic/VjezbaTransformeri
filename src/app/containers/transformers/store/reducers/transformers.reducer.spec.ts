import * as fromTransformes from './transformers.reducer'
import * as fromActions from '../actions/transformers.action'

import { Transformer } from '../../models/transformer.model'

describe('Transformers Reducer', () => {
  describe('undefined action',() => {
    it('should return default state', () => {
      const { initalState } = fromTransformes
      const action = {} as any
      const state = fromTransformes.reducer(undefined,action)

      expect(state).toBe(initalState)
    })
  })

  describe('LOAD_TRANSFORMES action',() => {
    it('should set loading to true', () => {
      const { initalState } = fromTransformes
      const action = new fromActions.LoadTransformers()
      const state = fromTransformes.reducer(initalState,action)

      expect(state.loaded).toEqual(false)
      expect(state.loading).toEqual(true)
    })
  })
  describe('LOAD_TRANSFORMES_SUCCESS action',() => {
    it('should map array to entities', () => {
      const transformer: Transformer[] = [
        {
          id: 12,
          name: 'Megatron',
          vehicleGroup: 'Air',
          vehicleType: 'Plane',
          vehicleModel: 'Sukhoi',
          faction: 'Decepticons',
          gear: [
            {
              id: 3,
              name: 'cannon'
            }
          ],
          status: 'MIA'
        },
        {
          id: 13,
          name: 'Glupkotron',
          vehicleGroup: 'Air',
          vehicleType: 'Plane',
          vehicleModel: 'Sukhoi',
          faction: 'Decepticons',
          gear: [
            {
              id: 3,
              name: 'cannon'
            }
          ],
          status: 'MIA'
        }
      ]
      const { initalState } = fromTransformes
      const action = new fromActions.LoadTransformersSuccess(transformer)
      const state = fromTransformes.reducer(initalState,action)

      expect(state.entities).toEqual(transformer)
      expect(state.loaded).toEqual(true)
      expect(state.loading).toEqual(false)
    })
  })
})
