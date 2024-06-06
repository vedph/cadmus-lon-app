import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  AuthJwtLoginModule,
  AuthJwtService,
  Credentials,
} from '@myrmidon/auth-jwt-login';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    AuthJwtLoginModule,
  ],
})
export class LoginPageComponent implements OnInit {
  constructor(private _authService: AuthJwtService, private _router: Router) {}

  ngOnInit(): void {}

  public onLoginRequest(credentials: Credentials): void {
    this._authService
      .login(credentials.name, credentials.password)
      .subscribe((user) => {
        this._router.navigate([credentials.returnUrl || '/home']);
      });
  }

  public onResetRequest(): void {
    this._router.navigate(['/reset-password']);
  }
}
