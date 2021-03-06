import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { reducers, effects } from './store'

// components
import * as fromComponents from './components'

// containers
import * as fromContainers from './containers'

// services
import * as fromServices from './services'

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.TransformersComponent
  },
  {
    path: ':id',
    component: fromContainers.TransformersItemComponent
  },
  {
    path: 'new',
    component: fromContainers.TransformersItemComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('transformers', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class TransformersModule {}
