import { Injectable } from '@angular/core'

import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import { map, switchMap, catchError } from 'rxjs/operators'

import * as fromRoot from '../../../app/store'
import * as transformerActions from '../actions/transformers.action'
import * as fromServices from '../../services'

@Injectable()
export class TransformersEffects {
  constructor (private action$: Actions, private transformersService: fromServices.TransformersService) {}
  @Effect()
  loadTransformers$ = this.action$.ofType(transformerActions.LOAD_TRANSFORMERS).pipe(
    switchMap(() => {
      return this.transformersService.getTransformers().pipe(
        map(transformers => new transformerActions.LoadTransformersSuccess(transformers)),
        catchError(error => of(new transformerActions.LoadTransformersFailed(error)))
      )
    })
  )

  @Effect()
  createTransformer$ = this.action$.ofType(transformerActions.CREATE_TRANSFORMER).pipe(
    map((action: transformerActions.CreateTransformer) => action.payload),
    switchMap(transformer => {
      return this.transformersService.createTransformer(transformer).pipe(
        map(_transformer => new transformerActions.CreateTransformerSuccess(_transformer)),
        catchError(error => of(new transformerActions.CreateTransformerFail(error)))
      )
    })
  )

  @Effect()
  createTransformerSuccess$ = this.action$.ofType(transformerActions.CREATE_TRANSFORMER_SUCCESS).pipe(
    map((action: transformerActions.CreateTransformerSuccess) => action.payload),
    map(transformer => new fromRoot.Go({
      path: ['/transformers']
    }))
  )

  @Effect()
  updateTransformer$ = this.action$.ofType(transformerActions.UPDATE_TRANSFORMER).pipe(
    map((action: transformerActions.UpdateTransformer) => action.payload),
    switchMap(transformer => {
      return this.transformersService.updateTransformer(transformer).pipe(
        map(_transformer => new transformerActions.UpdateTransformerSuccess(transformer)),
        catchError(error => of(new transformerActions.UpdateTransformerFail(error)))
      )
    }),
    map(transformer => new fromRoot.Go({
      path: ['/transformers']
    }))
  )

  @Effect()
  removeTransformer$ = this.action$.ofType(transformerActions.REMOVE_TRANSFORMER).pipe(
    map((action: transformerActions.RemoveTransformer) => action.payload),
    switchMap(transformer => {
      return this.transformersService.removeTransformer(transformer).pipe(
        map(() => new transformerActions.RemoveTransformerSuccess(transformer)),
        catchError(error => of(new transformerActions.RemoveTransformerFail(error)))
      )
    }),
      map(transformer => {
        return new fromRoot.Go({
          path: ['/transformers']
        })
      })
  )

  @Effect()
  handleTransformerSuccess$ = this.action$
  .ofType(transformerActions.UPDATE_TRANSFORMER_SUCCESS, transformerActions.REMOVE_TRANSFORMER_SUCCESS)
  .pipe(
      map(transformer => {
        return new fromRoot.Go({
          path: ['/transformers']
        })
      })
  )
}
