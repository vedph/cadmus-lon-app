import { Component, effect, input, model, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QuotedWork } from '../../quoted-works-part';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

@Component({
  selector: 'cadmus-lon-quoted-work',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './quoted-work.component.html',
  styleUrl: './quoted-work.component.css',
})
export class QuotedWorkComponent {
  public readonly work = model<QuotedWork>();

  // quoted-works-roles
  public readonly roleEntries = input<ThesaurusEntry[]>();

  public readonly workCancel = output();

  public id: FormControl<string>;
  public role: FormControl<string>;
  public location: FormControl<string | null>;
  public note: FormControl<string | null>;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // form
    this.id = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.role = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(50)],
      nonNullable: true,
    });
    this.location = formBuilder.control(null, Validators.maxLength(100));
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      id: this.id,
      role: this.role,
      location: this.location,
      note: this.note,
    });

    effect(() => {
      this.updateForm(this.work());
    });
  }

  private updateForm(model: QuotedWork | undefined | null): void {
    if (!model) {
      this.form.reset();
      return;
    }

    this.id.setValue(model.id);
    this.role.setValue(model.role);
    this.location.setValue(model.location || null);
    this.note.setValue(model.note || null);

    this.form.markAsPristine();
  }

  private getWork(): QuotedWork {
    return {
      id: this.id.value?.trim(),
      role: this.role.value?.trim(),
      location: this.location.value?.trim() || undefined,
      note: this.note.value?.trim() || undefined,
    };
  }

  public cancel(): void {
    this.workCancel.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.work.set(this.getWork());
  }
}
