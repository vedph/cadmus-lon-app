import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PendingChangesGuard } from '@myrmidon/cadmus-core';

import {
  LETTER_ATTACHMENTS_PART_TYPEID,
  LETTER_INFO_PART_TYPEID,
} from '@myrmidon/cadmus-lon-part-ui';

import { LetterInfoPartFeatureComponent } from './components/letter-info-part-feature/letter-info-part-feature.component';
import { LetterAttachmentsPartFeatureComponent } from './components/letter-attachments-part-feature/letter-attachments-part-feature.component';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${LETTER_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LetterInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${LETTER_ATTACHMENTS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LetterAttachmentsPartFeatureComponent,
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
    LetterAttachmentsPartFeatureComponent,
  ],
  exports: [LetterInfoPartFeatureComponent],
})
export class CadmusLonPartPgModule {}
