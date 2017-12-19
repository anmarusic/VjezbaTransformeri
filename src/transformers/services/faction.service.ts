import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'
import 'rxjs/add/observable/throw'

import { Faction } from '../models/faction.model'

@Injectable()
export class FactionService {
  constructor (private http: HttpClient) {}

  getFaction (): Observable<Faction[]> {
    return this.http
      .get<Faction[]>(`http://localhost:3000/faction`)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }
}
