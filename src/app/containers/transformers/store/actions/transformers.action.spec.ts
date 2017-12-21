import * as fromTransformers from './index'

describe('Transformers action',() => {
  describe('LoadTransformers action', () => {
    describe('LoadTransformers', () => {
      it('should create an action', () => {
        const action = new fromTransformers.LoadTransformers()
        expect({ ...action }).toEqual({
          type: fromTransformers.LOAD_TRANSFORMERS
        })
      })
    })

    describe('LoadTransformersFailed', () => {
      it('should create an action', () => {
        const payload = { message: 'Load error ' }
        const action = new fromTransformers.LoadTransformersFailed(payload)
        expect({ ...action }).toEqual({
          type: fromTransformers.LOAD_TRANSFORMERS_FAILED,
          payload
        })
      })
    })

    describe('LoadTransformersSuccess', () => {
      it('should create an action', () => {
        const payload = [
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
        const action = new fromTransformers.LoadTransformersSuccess(payload)
        expect({ ...action }).toEqual({
          type: fromTransformers.LOAD_TRANSFORMERS_SUCCESS,
          payload
        })
      })
    })
  })

})
