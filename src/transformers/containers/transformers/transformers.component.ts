import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromStore from '../../store'

import { Transformer } from '../../models/transformer.model'
import { Faction } from '../../models/faction.model'
import { FactionService } from '../../services/faction.service'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-transformers-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['transformers.component.scss'],
  template: `
    <div class="transformers">
      <div class="transformers__new">
        <a class="btn btn__ok"
          routerLink="./new">
          Add Transformer
        </a>
      </div>
      <div class="transformers__new">
        <input (keyup)="updateTransformersListInput($event)"
         type="text" placeholder="Search transformer" class="transformers__input">
      </div>
      <div class="transformers__new">
        <select
        (change)="updateTransformersList($event)"
        class="transformers__select">
            <option disabled selected value> -- Search by faction -- </option>
            <option *ngFor="let x of (faction$ | async)" [ngValue]="x?.name">{{ x?.name }}</option>
        </select>
      </div>
      <div class="transformers__list">
        <div *ngIf="!((transformer$ | async)?.length)">
          No Transformers left, apocalypse now.
        </div>
        <ng-container
          *ngFor="let transformer of (transformer$ | async)">
          <app-transformer-item
          [transformer]="transformer">
          </app-transformer-item>
        </ng-container>
      </div>
    </div>
  `
})
export class TransformersComponent implements OnInit {
  transformer$: Observable<Transformer[]>
  faction$: Observable<Faction[]>
  selectedFaction: string
  inputedName: string

  constructor (private store: Store<fromStore.TransformersState>, private factionService: FactionService) {}

  ngOnInit () {
    this.transformer$ = this.store.select(fromStore.getAllTransformers)
    this.faction$ = this.store.select(fromStore.getAllFaction)
    this.store.dispatch(new fromStore.LoadTransformers())
    this.selectedFaction = ''
    this.inputedName = ''
    this.store.dispatch(new fromStore.LoadFaction())
  }
  updateTransformersList (faction) {
    this.selectedFaction = faction.target.value
    this.store.dispatch(new fromStore.LoadFiltratedTransformers(this.transformer$,this.selectedFaction,this.inputedName))
  }
  updateTransformersListInput (name) {
    this.inputedName = name.target.value
    this.store.dispatch(new fromStore.LoadFiltratedTransformers(this.transformer$,this.selectedFaction,this.inputedName))
  }
}
