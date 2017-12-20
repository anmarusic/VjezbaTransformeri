import { Injectable } from '@angular/core'

import { Effect, Actions } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import * as vehiclesActions from '../actions/vehicles.action'

import * as fromServices from '../../services'

@Injectable()
export class VehiclesEffects {
  constructor (private action$: Actions, private vehiclesService: fromServices.VehicleService) {}
  @Effect()
  loadVehicles$ = this.action$.ofType(vehiclesActions.LOAD_VEHICLES).pipe(
    switchMap(() => {
      return this.vehiclesService.getVehicles().pipe(
        map(vehicles => new vehiclesActions.LoadVehiclesSuccess(vehicles)),
        catchError(error => of(new vehiclesActions.LoadVehiclesFail(error)))
      )
    })
  )
}
