import { Action } from '@ngrx/store'

import { Transformer } from '../../models/transformer.model'

// load transformers

export const LOAD_TRANSFORMERS = '[Transformers] Load transformers'
export const LOAD_TRANSFORMERS_FAILED = '[Transformers] Load transformers failed'
export const LOAD_TRANSFORMERS_SUCCESS = '[Transformers] Load transformers success'

export class LoadTransformers implements Action {
  readonly type = LOAD_TRANSFORMERS
}

export class LoadTransformersFailed implements Action {
  readonly type = LOAD_TRANSFORMERS_FAILED
  constructor (public payload: any) {}
}

export class LoadTransformersSuccess implements Action {
  readonly type = LOAD_TRANSFORMERS_SUCCESS
  constructor (public payload: any) {}
}

// load Filtrated Transformes

export const FILTER_TRANSFORMERS = '[Transformers] Filter transformers'
export const FILTER_TRANSFORMERS_SUCCESS = '[Transformers] Filter transformers success'

export class FilterTransformers implements Action {
  readonly type = FILTER_TRANSFORMERS
}

export class FilterTransformersSuccess implements Action {
  readonly type = FILTER_TRANSFORMERS_SUCCESS
  constructor (public payload: any) {}
}
// update filters

export const UPDATE_FILTER_NAME = '[Transformers] update filter name'
export const UPDATE_FILTER_FACTION = '[Transformers] update filter faction'

export class UpdateFilterName implements Action {
  readonly type = UPDATE_FILTER_NAME
  constructor (public payload: string) {}
}
export class UpdateFilterFaction implements Action {
  readonly type = UPDATE_FILTER_FACTION
  constructor (public payload: string) {}
}
// create transformer

export const CREATE_TRANSFORMER = '[Transformers] Create transformer'
export const CREATE_TRANSFORMER_FAIL = '[Transformers] Create transformer fail'
export const CREATE_TRANSFORMER_SUCCESS = '[Transformers] Create transformer success'

export class CreateTransformer implements Action {
  readonly type = CREATE_TRANSFORMER
  constructor (public payload: Transformer) {}
}

export class CreateTransformerFail implements Action {
  readonly type = CREATE_TRANSFORMER_FAIL
  constructor (public payload: any) {}
}

export class CreateTransformerSuccess implements Action {
  readonly type = CREATE_TRANSFORMER_SUCCESS
  constructor (public payload: Transformer) {}
}

// Update transformer

export const UPDATE_TRANSFORMER = '[Transformers] Update transformer'
export const UPDATE_TRANSFORMER_FAIL = '[Transformers] Update transformer fail'
export const UPDATE_TRANSFORMER_SUCCESS = '[Transformers] Update transformer success'

export class UpdateTransformer implements Action {
  readonly type = UPDATE_TRANSFORMER
  constructor (public payload: Transformer) {}
}

export class UpdateTransformerFail implements Action {
  readonly type = UPDATE_TRANSFORMER_FAIL
  constructor (public payload: any) {}
}

export class UpdateTransformerSuccess implements Action {
  readonly type = UPDATE_TRANSFORMER_SUCCESS
  constructor (public payload: Transformer) {}
}

// remove transformer
export const REMOVE_TRANSFORMER = '[Transformers] Remove transformer'
export const REMOVE_TRANSFORMER_FAIL = '[Transformers] Remove transformer fail'
export const REMOVE_TRANSFORMER_SUCCESS = '[Transformers] Remove transformer success'

export class RemoveTransformer implements Action {
  readonly type = REMOVE_TRANSFORMER
  constructor (public payload: Transformer) {}
}

export class RemoveTransformerFail implements Action {
  readonly type = REMOVE_TRANSFORMER_FAIL
  constructor (public payload: any) {}
}

export class RemoveTransformerSuccess implements Action {
  readonly type = REMOVE_TRANSFORMER_SUCCESS
  constructor (public payload: Transformer) {}
}

// action types
export type TransformersAction = LoadTransformers
| LoadTransformersFailed
| LoadTransformersSuccess
| FilterTransformers
| FilterTransformersSuccess
| UpdateFilterName
| UpdateFilterFaction
| CreateTransformer
| CreateTransformerFail
| CreateTransformerSuccess
| UpdateTransformer
| UpdateTransformerFail
| UpdateTransformerSuccess
| RemoveTransformer
| RemoveTransformerFail
| RemoveTransformerSuccess
