import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';

import { QuotedWorksPartComponent } from '@myrmidon/cadmus-lon-part-ui';

@Component({
  selector: 'cadmus-lon-quoted-works-part-feature',
  imports: [CadmusUiPgModule, QuotedWorksPartComponent],
  templateUrl: './quoted-works-part-feature.component.html',
  styleUrl: './quoted-works-part-feature.component.css',
})
export class QuotedWorksPartFeatureComponent
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
    return ['quoted-works-ids', 'quoted-works-roles'];
  }
}
