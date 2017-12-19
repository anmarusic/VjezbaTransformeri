import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'
import 'rxjs/add/observable/throw'

import { Gear } from '../models/gear.model'

@Injectable()
export class GearService {
  constructor (private http: HttpClient) {}

  getGear (): Observable<Gear[]> {
    return this.http
      .get<Gear[]>(`http://localhost:3000/gear`)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }
}
