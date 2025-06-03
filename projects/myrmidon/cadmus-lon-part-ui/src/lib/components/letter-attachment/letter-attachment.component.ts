
import { Component, effect, input, model, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  PhysicalSize,
  PhysicalSizeComponent,
} from '@myrmidon/cadmus-mat-physical-size';

import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { LetterAttachment } from '../../letter-attachments-part';

@Component({
  selector: 'cadmus-lon-letter-attachment',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    PhysicalSizeComponent
],
  templateUrl: './letter-attachment.component.html',
  styleUrl: './letter-attachment.component.css',
})
export class LetterAttachmentComponent {
  public readonly attachment = model<LetterAttachment>();

  // letter-attachment-types
  public readonly typeEntries = input<ThesaurusEntry[]>();

  // physical-size-units
  public readonly sizeUnitEntries = input<ThesaurusEntry[]>();

  // physical-size-tags
  public readonly sizeTagEntries = input<ThesaurusEntry[]>();

  // physical-size-dim-tags
  public readonly sizeDimTagEntries = input<ThesaurusEntry[]>();

  public readonly attachmentCancel = output();

  public type: FormControl<string | null>;
  public name: FormControl<string>;
  public note: FormControl<string | null>;
  public hasSize: FormControl<boolean>;
  public size: FormControl<PhysicalSize | null>;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.type = formBuilder.control(null, {
      validators: [Validators.required, Validators.maxLength(50)],
    });
    this.name = formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    });
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.hasSize = formBuilder.control(false, { nonNullable: true });
    this.size = formBuilder.control(null);
    this.form = formBuilder.group({
      type: this.type,
      name: this.name,
      note: this.note,
      hasSize: this.hasSize,
      size: this.size,
    });

    effect(() => {
      this.updateForm(this.attachment());
    });
  }

  private updateForm(attachment?: LetterAttachment): void {
    if (!attachment) {
      this.form.reset();
      return;
    }

    this.type.setValue(attachment.type);
    this.name.setValue(attachment.name);
    this.note.setValue(attachment.note || null);
    this.hasSize.setValue(!!attachment.size);
    this.size.setValue(attachment.size || null);

    this.form.markAsPristine();
  }

  private getAttachment(): LetterAttachment {
    return {
      type: this.type.value?.trim() || '-',
      name: this.name.value?.trim(),
      note: this.note.value?.trim(),
      size: this.hasSize.value && this.size.value ? this.size.value : undefined,
    };
  }

  public onSizeChange(size: PhysicalSize): void {
    this.size.setValue(size);
    this.size.markAsDirty();
    this.size.updateValueAndValidity();
  }

  public cancel(): void {
    this.attachmentCancel.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.attachment.set(this.getAttachment());
  }
}
