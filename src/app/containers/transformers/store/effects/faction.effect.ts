import { Injectable } from '@angular/core'

import { Effect, Actions } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import * as factionActions from '../actions/faction.action'

import * as fromServices from '../../services'

@Injectable()
export class FactionEffects {
  constructor (private action$: Actions, private factionService: fromServices.FactionService) {}
  @Effect()
  loadFaction$ = this.action$.ofType(factionActions.LOAD_FACTION).pipe(
    switchMap(() => {
      return this.factionService.getFaction().pipe(
        map(faction => new factionActions.LoadFactionSuccess(faction)),
        catchError(error => of(new factionActions.LoadFactionFail(error)))
      )
    })
  )
}
