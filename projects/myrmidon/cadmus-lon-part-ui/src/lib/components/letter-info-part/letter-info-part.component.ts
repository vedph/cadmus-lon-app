import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

// bricks
import {
  Flag,
  FlagsPickerAdapter,
  FlagsPickerComponent,
} from '@myrmidon/cadmus-ui-flags-picker';

// cadmus
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  PhysicalSize,
  PhysicalSizeComponent,
} from '@myrmidon/cadmus-mat-physical-size';
import {
  ModelEditorComponentBase,
  EditedObject,
  CloseSaveButtonsComponent,
} from '@myrmidon/cadmus-ui';

// local
import {
  LETTER_INFO_PART_TYPEID,
  LetterInfoPart,
} from '../../letter-info-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * Letter info part editor component.
 * Thesauri: letter-info-archives, letter-info-languages, letter-info-features,
 * physical-size-units, physical-size-tags, physical-size-dim-tags
 * (all optional).
 */
@Component({
  selector: 'cadmus-lon-letter-info-part',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    // bricks
    PhysicalSizeComponent,
    FlagsPickerComponent,
    // cadmus
    CloseSaveButtonsComponent,
  ],
  templateUrl: './letter-info-part.component.html',
  styleUrl: './letter-info-part.component.css',
})
export class LetterInfoPartComponent
  extends ModelEditorComponentBase<LetterInfoPart>
  implements OnInit
{
  // flags
  private readonly _flagAdapter: FlagsPickerAdapter = new FlagsPickerAdapter();
  private _featureEntries?: ThesaurusEntry[];
  public featFlags$: Observable<Flag[]>;

  private _langEntries?: ThesaurusEntry[];
  public langFlags$: Observable<Flag[]>;

  // controls
  public archive: FormControl<string>;
  public shelfmark: FormControl<string>;
  public language: FormControl<string>;
  public languages: FormControl<Flag[]>;
  public features: FormControl<Flag[]>;
  public hasSize: FormControl<boolean>;
  public size: FormControl<PhysicalSize | null>;

  // letter-info-archives
  public archiveEntries?: ThesaurusEntry[];

  // letter-info-languages
  public get languageEntries(): ThesaurusEntry[] | undefined {
    return this._langEntries;
  }
  public set languageEntries(value: ThesaurusEntry[] | undefined) {
    if (this._langEntries === value) {
      return;
    }
    this._langEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'languages',
      this._langEntries.map(entryToFlag)
    );
  }

  // letter-info-features
  public get featureEntries(): ThesaurusEntry[] | undefined {
    return this._featureEntries;
  }
  public set featureEntries(value: ThesaurusEntry[] | undefined) {
    if (this._featureEntries === value) {
      return;
    }
    this._featureEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'features',
      this._featureEntries.map(entryToFlag)
    );
  }

  // physical-size-units
  public sizeUnitEntries?: ThesaurusEntry[];
  // physical-size-tags
  public sizeTagEntries?: ThesaurusEntry[];
  // physical-size-dim-tags
  public sizeDimTagEntries?: ThesaurusEntry[];

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this.langFlags$ = this._flagAdapter.selectFlags('languages');
    this.featFlags$ = this._flagAdapter.selectFlags('features');
    // form
    this.archive = formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    });
    this.shelfmark = formBuilder.control<string>('', {
      nonNullable: true,
      validators: Validators.maxLength(100),
    });
    this.language = formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    });
    this.languages = formBuilder.control<Flag[]>([], { nonNullable: true });
    this.features = formBuilder.control<Flag[]>([], { nonNullable: true });
    this.hasSize = formBuilder.control<boolean>(false, { nonNullable: true });
    this.size = formBuilder.control<PhysicalSize | null>(null);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      archive: this.archive,
      shelfmark: this.shelfmark,
      language: this.language,
      languages: this.languages,
      features: this.features,
      hasSize: this.hasSize,
      size: this.size,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'letter-info-archives';
    if (this.hasThesaurus(key)) {
      this.archiveEntries = thesauri[key].entries;
    } else {
      this.archiveEntries = undefined;
    }

    key = 'letter-info-languages';
    if (this.hasThesaurus(key)) {
      this.languageEntries = thesauri[key].entries;
    } else {
      this.languageEntries = undefined;
    }

    key = 'letter-info-features';
    if (this.hasThesaurus(key)) {
      this.featureEntries = thesauri[key].entries;
    } else {
      this.featureEntries = undefined;
    }
  }

  private updateForm(part?: LetterInfoPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.archive.setValue(part.archive || '');
    this.shelfmark.setValue(part.shelfmark || '');
    this.language.setValue(part.language || '');
    this.languages.setValue(
      this._flagAdapter.setSlotChecks('languages', part.languages || [])
    );
    this.features.setValue(
      this._flagAdapter.setSlotChecks('features', part.features || [])
    );
    this.hasSize.setValue(part.size !== undefined);
    this.size.setValue(part.size || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<LetterInfoPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): LetterInfoPart {
    let part = this.getEditedPart(LETTER_INFO_PART_TYPEID) as LetterInfoPart;
    part.archive = this.archive.value?.trim() || '';
    part.shelfmark = this.shelfmark.value?.trim() || '';
    part.language = this.language.value?.trim() || '';
    part.languages = this._flagAdapter.getOptionalCheckedFlagIds('languages');
    part.features = this._flagAdapter.getOptionalCheckedFlagIds('features');
    if (this.hasSize.value && this.size.value) {
      part.size = this.size.value;
    } else {
      part.size = undefined;
    }

    return part;
  }

  public onLangFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('languages', flags, true);
    this.languages.setValue(flags);
    this.languages.markAsDirty();
    this.language.updateValueAndValidity();
  }

  public onFeatFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('features', flags, true);
    this.features.setValue(flags);
    this.features.markAsDirty();
    this.features.updateValueAndValidity();
  }

  public onSizeChange(size: PhysicalSize | null): void {
    this.size.setValue(size);
    this.size.markAsDirty();
    this.size.updateValueAndValidity();
  }
}
