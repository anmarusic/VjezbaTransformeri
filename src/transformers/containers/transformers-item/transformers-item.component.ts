import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/observable'
import { tap } from 'rxjs/operators'

import * as fromStore from '../../store'

import { Transformer } from '../../models/transformer.model'

import { Gear } from '../../models/gear.model'

import { Faction } from '../../models/faction.model'

import { Vehicle } from '../../models/vehicle.model'
import { VehicleService } from '../../services/vehicle.service'

@Component({
  selector: 'app-transformers-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['transformers-item.component.scss'],
  template: `
    <div
      class="transformers-item">
      <app-transformer-form
        [transformer]="transformer$"
        [gear]="gear$ | async"
        [faction]="faction$ | async"
        [vehicle]="vehicle$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
      </app-transformer-form>
    </div>
  `
})
export class TransformersItemComponent implements OnInit {
  transformer$: Observable<Transformer>
  gear$: Observable<Gear[]>
  faction$: Observable<Faction[]>
  vehicle$: Observable<Vehicle[]>

  constructor (
    private store: Store<fromStore.TransformersState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit () {
    this.store.select(fromStore.getAllTransformers).subscribe(transformers => {
      const param = this.route.snapshot.params.id
      let transformer
      if (param === 'new') {
        transformer = {}
      } else {
        transformer = transformers.find(transformer => transformer.id === parseInt(param, 10))
      }
      this.transformer$ = transformer
    })
    this.gear$ = this.store.select(fromStore.getAllGear)
    this.faction$ = this.store.select(fromStore.getAllFaction)
    this.vehicle$ = this.store.select(fromStore.getAllVehicles)
    this.store.dispatch(new fromStore.LoadGear())
    this.store.dispatch(new fromStore.LoadFaction())
    this.store.dispatch(new fromStore.LoadVehicles())
  }

  onSelect (event: number[]) {
    this.store.dispatch(new fromStore.VisualiseGear(event))
  }

  onCreate (event: Transformer) {
    this.store.dispatch(new fromStore.CreateTransformer(event))
  }

  onUpdate (event: Transformer) {
    this.store.dispatch(new fromStore.UpdateTransformer(event))
  }

  onRemove (event: Transformer) {
    const remove = window.confirm('Are you sure?')
    if (remove) {
      this.store.dispatch(new fromStore.RemoveTransformer(event))
    }
  }
}
