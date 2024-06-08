import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { DialogService } from '@myrmidon/ng-mat-tools';
import { NgToolsModule, NgToolsValidators } from '@myrmidon/ng-tools';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  CadmusUiModule,
  EditedObject,
  ModelEditorComponentBase,
} from '@myrmidon/cadmus-ui';

import {
  QUOTED_WORKS_PART_TYPEID,
  QuotedWork,
  QuotedWorksPart,
} from '../../quoted-works-part';
import { QuotedWorkComponent } from '../quoted-work/quoted-work.component';

/**
 * Quoted works part editor component.
 * Thesauri: quoted-works-ids (required, hierarchical), quoted-works-roles (optional).
 */
@Component({
  selector: 'cadmus-lon-quoted-works-part',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgToolsModule,
    CadmusUiModule,
    QuotedWorkComponent,
  ],
  templateUrl: './quoted-works-part.component.html',
  styleUrl: './quoted-works-part.component.css',
})
export class QuotedWorksPartComponent
  extends ModelEditorComponentBase<QuotedWorksPart>
  implements OnInit
{
  private _editedIndex: number;

  public tabIndex: number;
  public edited?: QuotedWork;

  // quoted-works-ids (hierarchical)
  public idEntries?: ThesaurusEntry[];

  // quoted-works-roles
  public roleEntries?: ThesaurusEntry[];

  public works: FormControl<QuotedWork[]>;

  constructor(
    authService: AuthJwtService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService, formBuilder);
    this._editedIndex = -1;
    this.tabIndex = 0;
    // form
    this.works = formBuilder.control([], {
      // at least 1 entry
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      works: this.works,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'quoted-works-ids';
    if (this.hasThesaurus(key)) {
      this.idEntries = thesauri[key].entries;
    } else {
      this.idEntries = undefined;
    }

    key = 'quoted-works-roles';
    if (this.hasThesaurus(key)) {
      this.roleEntries = thesauri[key].entries;
    } else {
      this.roleEntries = undefined;
    }
  }

  private updateForm(part?: QuotedWorksPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.works.setValue(part.works || []);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<QuotedWorksPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): QuotedWorksPart {
    let part = this.getEditedPart(QUOTED_WORKS_PART_TYPEID) as QuotedWorksPart;
    part.works = this.works.value || [];
    return part;
  }

  public addWork(id: string): void {
    const work: QuotedWork = {
      id,
      role: '-',
    };
    this.editWork(work, -1);
  }

  public onTreeEntryChange(entry: ThesaurusEntry): void {
    // find entry.id among works
    const index = this.works.value.findIndex((e) => e.id === entry.id);
    // if found, edit that work
    if (index > -1) {
      this.editWork(this.works.value[index], index);
    }
    // else add a new one with entry.id
    else {
      this.addWork(entry.id);
    }
  }

  public editWork(work: QuotedWork, index: number): void {
    this._editedIndex = index;
    this.edited = work;
    setTimeout(() => {
      this.tabIndex = 1;
    });
  }

  public closeWork(): void {
    this._editedIndex = -1;
    this.edited = undefined;
    setTimeout(() => {
      this.tabIndex = 0;
    });
  }

  public saveWork(work: QuotedWork): void {
    const entries = [...this.works.value];
    if (this._editedIndex === -1) {
      entries.push(work);
    } else {
      entries.splice(this._editedIndex, 1, work);
    }
    this.works.setValue(entries);
    this.works.markAsDirty();
    this.works.updateValueAndValidity();
    this.closeWork();
  }

  public deleteWork(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete work?')
      .subscribe((yes: boolean | undefined) => {
        if (yes) {
          if (this._editedIndex === index) {
            this.closeWork();
          }
          const entries = [...this.works.value];
          entries.splice(index, 1);
          this.works.setValue(entries);
          this.works.markAsDirty();
          this.works.updateValueAndValidity();
        }
      });
  }

  public moveWorkUp(index: number): void {
    if (index < 1) {
      return;
    }
    const entry = this.works.value[index];
    const entries = [...this.works.value];
    entries.splice(index, 1);
    entries.splice(index - 1, 0, entry);
    this.works.setValue(entries);
    this.works.markAsDirty();
    this.works.updateValueAndValidity();
  }

  public moveWorkDown(index: number): void {
    if (index + 1 >= this.works.value.length) {
      return;
    }
    const entry = this.works.value[index];
    const entries = [...this.works.value];
    entries.splice(index, 1);
    entries.splice(index + 1, 0, entry);
    this.works.setValue(entries);
    this.works.markAsDirty();
    this.works.updateValueAndValidity();
  }
}
