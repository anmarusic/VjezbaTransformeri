import { TransformersService } from './transformers.service'
import { GearService } from './gear.service'
import { FactionService } from './faction.service'
import { VehicleService } from './vehicle.service'

export const services: any[] = [TransformersService, GearService, FactionService, VehicleService]

export * from './transformers.service'
export * from './gear.service'
export * from './faction.service'
export * from './vehicle.service'
