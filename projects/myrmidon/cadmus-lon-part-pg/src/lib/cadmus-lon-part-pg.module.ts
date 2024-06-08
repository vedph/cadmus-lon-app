import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PendingChangesGuard } from '@myrmidon/cadmus-core';

import { LETTER_INFO_PART_TYPEID } from '@myrmidon/cadmus-lon-part-ui';

import { LetterInfoPartFeatureComponent } from './components/letter-info-part-feature/letter-info-part-feature.component';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${LETTER_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LetterInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  // ... other parts ...
]);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // local
    LetterInfoPartFeatureComponent,
  ],
  exports: [LetterInfoPartFeatureComponent],
})
export class CadmusLonPartPgModule {}
