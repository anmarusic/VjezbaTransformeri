import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core'

@Component({
  selector: 'app-transformer-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['transformer-item.component.scss'],
  template: `
    <div class="transformer-item">
      <a [routerLink]="['/transformers', transformer?.id]">
      <div class="transformer-display">
        <div class="transformer-display__base">
          <img class="transformer-display__img" src="/assets/img/{{ transformer?.faction }}.svg">
        </div>
      </div>
        <h4>{{ transformer?.name }}</h4>
        <button type="button" class="btn btn__ok">
          View Transformer
        </button>
      </a>
    </div>
  `
})
export class TransformerItemComponent {
  @Input() transformer: any
}
