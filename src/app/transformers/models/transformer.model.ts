import { Gear } from '../models/gear.model'

export interface Transformer {
  id?: number
  name?: string
  vehicleGroup?: string
  vehicleType?: string
  vehicleModel?: string
  faction?: string
  gear?: Gear[]
  status?: string
}
