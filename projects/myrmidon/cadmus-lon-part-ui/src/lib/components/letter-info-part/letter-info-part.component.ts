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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

// bricks
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';

// cadmus
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  PhysicalSize,
  PhysicalSizeComponent,
} from '@myrmidon/cadmus-mat-physical-size';
import {
  ModelEditorComponentBase,
  EditedObject,
  CadmusUiModule,
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
 * Thesauri: letter-info-archives, letter-info-languages, letter-info-features
 * (all optional).
 */
@Component({
  selector: 'cadmus-letter-info-part',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    // bricks
    PhysicalSizeComponent,
    // cadmus
    CadmusUiModule,
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

  // controls
  public archive: FormControl<string>;
  public shelfmark: FormControl<string>;
  public language: FormControl<string>;
  public languages: FormControl<string[]>;
  public features: FormControl<Flag[]>;
  public hasSize: FormControl<boolean>;
  public size: FormControl<PhysicalSize | null>;

  // thesauri entries
  // letter-info-archives
  public archiveEntries?: ThesaurusEntry[];
  // letter-info-languages
  public languageEntries?: ThesaurusEntry[];
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

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this.featFlags$ = this._flagAdapter.selectFlags('features');
    // form
    this.archive = formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    });
    this.shelfmark = formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    });
    this.language = formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    });
    this.languages = formBuilder.control<string[]>([], { nonNullable: true });
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
    this.languages.setValue(part.languages || []);
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
    part.languages = this.languages.value?.length
      ? this.languages.value
      : undefined;
    part.features = this._flagAdapter.getOptionalCheckedFlagIds('features');
    if (this.hasSize.value && this.size.value) {
      part.size = this.size.value;
    } else {
      part.size = undefined;
    }

    return part;
  }

  public onStateFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('features', flags, true);
    this.features.setValue(flags);
    this.features.markAsDirty();
    this.features.updateValueAndValidity();
  }
}
