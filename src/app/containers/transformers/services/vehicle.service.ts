import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'
import 'rxjs/add/observable/throw'

import { Vehicle } from '../models/vehicle.model'

@Injectable()
export class VehicleService {
  constructor (private http: HttpClient) {}

  getVehicles (): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(`http://localhost:3000/vehicleTypes`)
      .pipe(catchError((error: any) => Observable.throw(error)))
  }
}
