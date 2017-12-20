import { Injectable } from '@angular/core'

import { Effect, Actions } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import * as gearActions from '../actions/gear.action'

import * as fromServices from '../../services'

@Injectable()
export class GearEffects {
  constructor (private action$: Actions, private gearService: fromServices.GearService) {}
  @Effect()
  loadGear$ = this.action$.ofType(gearActions.LOAD_GEAR).pipe(
    switchMap(() => {
      return this.gearService.getGear().pipe(
        map(gear => new gearActions.LoadGearSuccess(gear)),
        catchError(error => of(new gearActions.LoadGearFail(error)))
      )
    })
  )
}
