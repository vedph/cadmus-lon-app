import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
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
  private _work: QuotedWork | undefined | null;

  @Input()
  public get work(): QuotedWork | undefined | null {
    return this._work;
  }
  public set work(value: QuotedWork | undefined | null) {
    if (this._work !== value) {
      this._work = value;
      this.updateForm(value);
    }
  }

  // quoted-works-roles
  @Input()
  public roleEntries?: ThesaurusEntry[];

  @Output()
  public readonly workChange: EventEmitter<QuotedWork> =
    new EventEmitter<QuotedWork>();

  @Output()
  public readonly workCancel: EventEmitter<void> = new EventEmitter<void>();

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
    this._work = this.getWork();
    this.workChange.emit(this._work);
  }
}
