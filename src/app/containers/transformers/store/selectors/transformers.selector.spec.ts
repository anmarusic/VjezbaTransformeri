import { TestBed } from '@angular/core/testing'
import { StoreModule, Store, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromReducers from '../reducers'
import * as fromActions from '../actions'
import * as fromSelectors from '../selectors'

import { Transformer } from '../../models/transformer.model'

describe('Transformers selectors', () => {
  let store: Store<fromReducers.TransformersState>

  const transformers: Transformer[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          transformers: combineReducers(fromReducers.reducers)
        })
      ]
    })
    store = TestBed.get(Store)

    spyOn(store, 'dispatch').and.callThrough()
  })

  describe('getTransformersEntities', () => {
    it('should return transformers as entities', () => {
      let result

      store
        .select(fromSelectors.getTransformersEntities)
        .subscribe(value => {
          result = value
        })

      expect(result).toEqual([])

      store.dispatch(new fromActions.LoadTransformersSuccess(transformers))

      expect(result).toEqual(transformers)
    })
  })

})
