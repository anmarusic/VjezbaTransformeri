import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Gear } from '../../models/gear.model'

const TRANSFORMER_GEAR_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TransformerGearComponent),
  multi: true
}

@Component({
  selector: 'app-transformer-gear',
  providers: [TRANSFORMER_GEAR_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['transformer-gear.component.scss'],
  template: `
    <div class="transformer-gear">
      <div
        class="transformer-gear-item"
        *ngFor="let _gear of gear"
        (click)="selectGear(_gear)"
        [class.active]="existsInGears(_gear)">
        <img src="/assets/img/gear/{{_gear.name}}.svg">
        {{ gear.name }}
      </div>
    </div>
  `
})
export class TransformerGearComponent implements ControlValueAccessor {
  @Input() gear: Gear[] = []

  value: Gear[] = []

  private onTouch: Function
  private onModelChange: Function

  registerOnChange (fn: Function) {
    this.onModelChange = fn
  }

  registerOnTouched (fn: Function) {
    this.onTouch = fn
  }

  writeValue (value: Gear[]) {
    this.value = value
  }

  selectGear (gear: Gear) {
    if (this.existsInGears(gear)) {
      this.value = this.value.filter(item => item.id !== gear.id)
    } else {
      this.value = [...this.value, gear]
    }
    this.onTouch()
    this.onModelChange(this.value)
  }

  existsInGears (gear: Gear) {
    return this.value.some(val => val.id === gear.id)
  }
}
