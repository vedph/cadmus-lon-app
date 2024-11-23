import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';

import { LetterInfoPartComponent } from '@myrmidon/cadmus-lon-part-ui';

@Component({
  selector: 'cadmus-lon-letter-info-part-feature',
  imports: [CadmusUiPgModule, LetterInfoPartComponent],
  templateUrl: './letter-info-part-feature.component.html',
  styleUrl: './letter-info-part-feature.component.css',
})
export class LetterInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    itemService: ItemService,
    thesaurusService: ThesaurusService,
    editorService: PartEditorService
  ) {
    super(
      router,
      route,
      snackbar,
      itemService,
      thesaurusService,
      editorService
    );
  }

  protected override getReqThesauriIds(): string[] {
    return [
      'letter-info-archives',
      'letter-info-languages',
      'letter-info-features',
      'physical-size-units',
      'physical-size-tags',
      'physical-size-dim-tags',
    ];
  }
}
