import { TransformersEffects } from './transformers.effect'
import { VehiclesEffects } from './vehicles.effect'
import { FactionEffects } from './faction.effect'
import { GearEffects } from './gear.effect'

export const effects: any[] = [TransformersEffects, GearEffects, FactionEffects, VehiclesEffects]

export * from './transformers.effect'
export * from './vehicles.effect'
export * from './faction.effect'
export * from './gear.effect'
