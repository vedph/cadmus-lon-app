import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { PhysicalSizeComponent } from '@myrmidon/cadmus-mat-physical-size';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${LETTER_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LetterInfoPartComponent,
    canDeactivate: [PendingChangesGuard],
  },
  // ... other parts ...
]);

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // material
    // ...
    // cadmus
    CadmusCoreModule,
    CadmusStateModule,
    CadmusUiModule,
    CadmusUiPgModule,
    CadmusUiPgModule,
    PhysicalSizeComponent,
  ],
  exports: [],
})
export class CadmusLonPartPgModule {}
