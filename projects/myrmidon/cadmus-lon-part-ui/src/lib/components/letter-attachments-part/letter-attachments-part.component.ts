import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { DialogService } from '@myrmidon/ng-mat-tools';
import { NgToolsModule, NgToolsValidators } from '@myrmidon/ng-tools';

// cadmus
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  CadmusUiModule,
  EditedObject,
  ModelEditorComponentBase,
} from '@myrmidon/cadmus-ui';

// local
import {
  LETTER_ATTACHMENTS_PART_TYPEID,
  LetterAttachment,
  LetterAttachmentsPart,
} from '../../letter-attachments-part';
import { LetterAttachmentComponent } from '../letter-attachment/letter-attachment.component';

/**
 * LetterAttachmentsPart editor component.
 * Thesauri: letter-attachment-types, physical-size-units, physical-size-tags,
 * physical-size-dim-tags (all optional).
 */
@Component({
  selector: 'cadmus-letter-attachments-part',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    // myrmidon
    NgToolsModule,
    // cadmus
    CadmusUiModule,
    LetterAttachmentComponent
  ],
  templateUrl: './letter-attachments-part.component.html',
  styleUrl: './letter-attachments-part.component.css',
})
export class LetterAttachmentsPartComponent
  extends ModelEditorComponentBase<LetterAttachmentsPart>
  implements OnInit
{
  private _editedIndex: number;

  public edited?: LetterAttachment;

  // letter-attachment-types
  public typeEntries?: ThesaurusEntry[];

  // physical-size-units
  public sizeUnitEntries?: ThesaurusEntry[];
  // physical-size-tags
  public sizeTagEntries?: ThesaurusEntry[];
  // physical-size-dim-tags
  public sizeDimTagEntries?: ThesaurusEntry[];

  public attachments: FormControl<LetterAttachment[]>;

  constructor(
    authService: AuthJwtService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService, formBuilder);
    this._editedIndex = -1;
    // form
    this.attachments = formBuilder.control([], {
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
      attachments: this.attachments,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'letter-attachment-types';
    if (this.hasThesaurus(key)) {
      this.typeEntries = thesauri[key].entries;
    } else {
      this.typeEntries = undefined;
    }

    key = 'physical-size-units';
    if (this.hasThesaurus(key)) {
      this.sizeUnitEntries = thesauri[key].entries;
    } else {
      this.sizeUnitEntries = undefined;
    }

    key = 'physical-size-tags';
    if (this.hasThesaurus(key)) {
      this.sizeTagEntries = thesauri[key].entries;
    } else {
      this.sizeTagEntries = undefined;
    }

    key = 'physical-size-dim-tags';
    if (this.hasThesaurus(key)) {
      this.sizeDimTagEntries = thesauri[key].entries;
    } else {
      this.sizeDimTagEntries = undefined;
    }
  }

  private updateForm(part?: LetterAttachmentsPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.attachments.setValue(part.attachments || []);
    this.form.markAsPristine();
  }

  protected override onDataSet(
    data?: EditedObject<LetterAttachmentsPart>
  ): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): LetterAttachmentsPart {
    let part = this.getEditedPart(
      LETTER_ATTACHMENTS_PART_TYPEID
    ) as LetterAttachmentsPart;
    part.attachments = this.attachments.value || [];
    return part;
  }

  public addAttachment(): void {
    const attachment: LetterAttachment = {
      type: '-',
      name: '',
    };
    this.editAttachment(attachment, -1);
  }

  public editAttachment(attachment: LetterAttachment, index: number): void {
    this._editedIndex = index;
    this.edited = attachment;
  }

  public closeAttachment(): void {
    this._editedIndex = -1;
    this.edited = undefined;
  }

  public saveAttachment(attachment: LetterAttachment): void {
    const entries = [...this.attachments.value];
    if (this._editedIndex === -1) {
      entries.push(attachment);
    } else {
      entries.splice(this._editedIndex, 1, attachment);
    }
    this.attachments.setValue(entries);
    this.attachments.markAsDirty();
    this.attachments.updateValueAndValidity();
    this.closeAttachment();
  }

  public deleteAttachment(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete attachment?')
      .subscribe((yes: boolean | undefined) => {
        if (yes) {
          if (this._editedIndex === index) {
            this.closeAttachment();
          }
          const entries = [...this.attachments.value];
          entries.splice(index, 1);
          this.attachments.setValue(entries);
          this.attachments.markAsDirty();
          this.attachments.updateValueAndValidity();
        }
      });
  }

  public moveAttachmentUp(index: number): void {
    if (index < 1) {
      return;
    }
    const entry = this.attachments.value[index];
    const entries = [...this.attachments.value];
    entries.splice(index, 1);
    entries.splice(index - 1, 0, entry);
    this.attachments.setValue(entries);
    this.attachments.markAsDirty();
    this.attachments.updateValueAndValidity();
  }

  public moveAttachmentDown(index: number): void {
    if (index + 1 >= this.attachments.value.length) {
      return;
    }
    const entry = this.attachments.value[index];
    const entries = [...this.attachments.value];
    entries.splice(index, 1);
    entries.splice(index + 1, 0, entry);
    this.attachments.setValue(entries);
    this.attachments.markAsDirty();
    this.attachments.updateValueAndValidity();
  }
}
