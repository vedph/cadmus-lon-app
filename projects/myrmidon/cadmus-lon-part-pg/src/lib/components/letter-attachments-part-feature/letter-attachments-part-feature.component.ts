import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { CurrentItemBarComponent } from '@myrmidon/cadmus-ui-pg';

import { LetterAttachmentsPartComponent } from '@myrmidon/cadmus-lon-part-ui';

@Component({
  selector: 'cadmus-lon-letter-attachments-part-feature',
  imports: [CurrentItemBarComponent, LetterAttachmentsPartComponent],
  templateUrl: './letter-attachments-part-feature.component.html',
  styleUrl: './letter-attachments-part-feature.component.css',
})
export class LetterAttachmentsPartFeatureComponent
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
      'letter-attachment-types',
      'physical-size-units',
      'physical-size-tags',
      'physical-size-dim-tags',
    ];
  }
}
