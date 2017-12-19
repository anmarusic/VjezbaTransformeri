import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms'

import { map } from 'rxjs/operators'

import { Transformer } from '../../models/transformer.model'
import { Gear } from '../../models/gear.model'
import { Faction } from '../../models/faction.model'
import { Vehicle } from '../../models/vehicle.model'

@Component({
  selector: 'app-transformer-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['transformer-form.component.scss'],
  template: `
    <div class="transformer-form">
      <div *ngIf="exists" class="transformer-display">
        <div class="transformer-display__base">
          <img class="transformer-display__img" src="/assets/img/{{ transformer?.faction }}.svg">
        </div>
      </div>
      <form [formGroup]="form">
      <label>
          <h4>Transformer name</h4>
          <input
            type="text"
            formControlName="name"
            placeholder="e.g. Bumblebee"
            class="transformer-form__input"
            [class.error]="nameControlInvalid">
          <div
            class="transformer-form__error"
            *ngIf="nameControlInvalid">
            <p>Transformer must have a name</p>
          </div>
        </label>
        <div *ngIf="faction != null">
        <h4>Transformer specs</h4>
          <div>
            <select
            formControlName="faction"
            class="transformer-form__select">
              <option disabled selected value> -- Select faction -- </option>
              <option *ngFor="let x of faction" [ngValue]="x?.name"
              [selected]="x==transformer?.faction">{{ x?.name }}</option>
            </select>
          </div>
        </div>
        <div  *ngIf="vehicle != null">
            <div>
              <select
              [(ngModel)]="group"
              (ngModelChange)="updateDropdownType($event)"
              formControlName="vehicleGroup"
              class="transformer-form__select">
              <option disabled selected value> -- Select vehicle group -- </option>
                <option *ngFor="let x of uniqueVehicleGroup"
                [ngValue]="x"
                [selected]="x==transformer?.vehicleGroup"
                 >{{ x }}</option>
              </select>
            </div>
        </div>
        <div *ngIf="(group !== '') || (exists)">
          <div>
            <select
            [(ngModel)]="type"
            (ngModelChange)="updateDropdownModel($event)"
            formControlName="vehicleType"
            class="transformer-form__select">
            <option disabled selected value> -- Select vehicle type -- </option>
              <option *ngFor="let x of uniqueVehicleType"
              [ngValue]="x"
              [selected]="x==transformer?.vehicleType" >{{ x }}</option>
            </select>
          </div>
        </div>
        <div *ngIf="(type !== '') || (exists)">
        <div>
          <select
          formControlName="vehicleModel"
          class="transformer-form__select">
          <option disabled selected value> -- Select vehicle model -- </option>
            <option *ngFor="let x of uniqueVehicleModel"
            [ngValue]="x"
            [selected]="x==transformer?.vehicleModel"  >{{ x }}</option>
          </select>
        </div>
      </div>
        <label>
          <h4>Select gear</h4>
        </label>

        <div class="transformer-form__list">
          <app-transformer-gear
            [gear]="gear"
            formControlName="gear">
          </app-transformer-gear>
        </div>

        <div class="transformer-form__actions">
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createTransformer(form)">
            Create Transformer
          </button>

          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            (click)="updateTransformer(form)">
            Save changes
          </button>

          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removeTransformer(form)">
            Delete Transformer
          </button>
        </div>

      </form>
    </div>
  `
})
export class TransformerFormComponent implements OnChanges {
  exists = false

  @Input() transformer: Transformer
  @Input() gear: Gear[]
  @Input() faction: Faction[]
  @Input() vehicle: Vehicle[]

  group = ''
  type = ''

  uniqueVehicleGroup: any[] = []
  uniqueVehicleModel: any[] = []
  uniqueVehicleType: any[] = []

  @Output() selected = new EventEmitter<Transformer>()
  @Output() create = new EventEmitter<Transformer>()
  @Output() update = new EventEmitter<Transformer>()
  @Output() remove = new EventEmitter<Transformer>()

  form = this.fb.group({
    name: ['', Validators.required],
    faction: ['', Validators.required],
    vehicleGroup: ['', Validators.required],
    vehicleType: ['', Validators.required],
    vehicleModel: ['', Validators.required],
    gear: [[]],
    status: 'OK'
  })

  constructor (private fb: FormBuilder) {}

  get nameControl () {
    return this.form.get('name') as FormControl
  }

  get nameControlInvalid () {
    return this.nameControl.hasError('required') && this.nameControl.touched
  }
  get factionControl () {
    return this.form.get('faction') as FormControl
  }

  get factionControlInvalid () {
    return this.factionControl.hasError('required') && this.factionControl.touched
  }

  get vehicleGroupControl () {
    return this.form.get('vehicleGroup') as FormControl
  }

  get vehicleGroupControlInvalid () {
    return this.vehicleGroupControl.hasError('required') && this.vehicleGroupControl.touched
  }

  get vehicleTypeControl () {
    return this.form.get('vehicleType') as FormControl
  }

  get vehicleTypeControlInvalid () {
    return this.vehicleTypeControl.hasError('required') && this.vehicleTypeControl.touched
  }
  get vehicleModelControl () {
    return this.form.get('vehicleModel') as FormControl
  }

  get vehicleModelControlInvalid () {
    return this.vehicleModelControl.hasError('required') && this.vehicleModelControl.touched
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.transformer && this.transformer.id) {
      this.exists = true
      this.form.patchValue(this.transformer)
    }
    this.form
      .get('gear')
      .valueChanges.pipe(
        map(gear => gear.map((_gear: Gear) => _gear.id))
      )
      .subscribe(value => this.selected.emit(value))
    if (this.vehicle !== undefined) {
      this.vehicle.forEach(element => {
        if (!this.uniqueVehicleGroup.includes(element.group)) {
          this.uniqueVehicleGroup.push(element.group)
        }
        if (this.exists) {
          this.updateDropdownType(this.transformer.vehicleGroup)
          this.updateDropdownModel(this.transformer.vehicleType)
        }
      })
    }
  }

  createTransformer (form: FormGroup) {
    const { value, valid } = form
    if (valid) {
      this.create.emit(value)
    }
  }

  updateTransformer (form: FormGroup) {
    const { value, valid, touched } = form
    if (touched && valid) {
      this.update.emit({ ...this.transformer, ...value })
    }
  }

  removeTransformer (form: FormGroup) {
    const { value } = form
    this.remove.emit({ ...this.transformer, ...value })
  }
  updateDropdownType (group) {
    this.uniqueVehicleType = []
    this.group = group
    if (this.group !== group) {
      this.type = ''
    }
    if (this.vehicle !== undefined) {
      this.vehicle.forEach(element => {
        if (group === element.group) {
          if (!this.uniqueVehicleType.includes(element.type)) {
            this.uniqueVehicleType.push(element.type)
          }
        }
      })
    }
  }
  updateDropdownModel (type) {
    this.uniqueVehicleModel = []
    this.type = type
    if (this.vehicle !== undefined) {
      this.vehicle.forEach(element => {
        if (type === element.type) {
          if (!this.uniqueVehicleModel.includes(element.model)) {
            this.uniqueVehicleModel.push(element.model)
          }
        }
      })
    }
  }
}
