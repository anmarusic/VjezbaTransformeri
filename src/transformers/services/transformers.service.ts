import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'
import 'rxjs/add/observable/throw'

import { Transformer } from '../models/transformer.model'

@Injectable()
export class TransformersService {
  constructor (private http: HttpClient) {}

  getTransformers (): Observable<Transformer[]> {
    return this.http
      .get<Transformer[]>(`http://localhost:3000/transformers`)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }

  createTransformer (payload: Transformer): Observable<Transformer> {
    return this.http
      .post<Transformer>(`http://localhost:3000/transformers`, payload)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }

  updateTransformer (payload: Transformer): Observable<Transformer> {
    return this.http
      .put<Transformer>(`http://localhost:3000/transformers/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }

  removeTransformer (payload: Transformer): Observable<Transformer> {
    return this.http
      .delete<any>(`http://localhost:3000/transformers/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }
}
