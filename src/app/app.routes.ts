import { Routes } from '@angular/router';

import {
  AuthJwtGuardService,
  AuthJwtAdminGuardService,
} from '@myrmidon/auth-jwt-login';
import { EditorGuardService } from '@myrmidon/cadmus-api';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageUsersPageComponent } from './manage-users-page/manage-users-page.component';
import { RegisterUserPageComponent } from './register-user-page/register-user-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  // local home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // local auth
  { path: 'login', component: LoginPageComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthJwtGuardService],
  },
  {
    path: 'register-user',
    component: RegisterUserPageComponent,
    canActivate: [AuthJwtAdminGuardService],
  },
  {
    path: 'manage-users',
    component: ManageUsersPageComponent,
    canActivate: [AuthJwtAdminGuardService],
  },
  // cadmus - items
  {
    path: 'items',
    loadChildren: () =>
      import('@myrmidon/cadmus-item-list').then(
        (module) => module.CadmusItemListModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  {
    path: 'items/:id',
    loadChildren: () =>
      import('@myrmidon/cadmus-item-editor').then(
        (module) => module.CadmusItemEditorModule
      ),
    canActivate: [AuthJwtGuardService],
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@myrmidon/cadmus-item-search').then(
        (module) => module.CadmusItemSearchModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  // cadmus - thesauri
  {
    path: 'thesauri',
    loadChildren: () =>
      import('@myrmidon/cadmus-thesaurus-list').then(
        (module) => module.CadmusThesaurusListModule
      ),
    canActivate: [EditorGuardService],
  },
  {
    path: 'thesauri/:id',
    loadChildren: () =>
      import('@myrmidon/cadmus-thesaurus-editor').then(
        (module) => module.CadmusThesaurusEditorModule
      ),
    canActivate: [EditorGuardService],
  },
  // cadmus - parts
  {
    path: 'items/:iid/general',
    loadChildren: () =>
      import('@myrmidon/cadmus-part-general-pg').then(
        (module) => module.CadmusPartGeneralPgModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  // cadmus - lon parts
  {
    path: 'items/:iid/lon',
    loadChildren: () =>
      import('@myrmidon/cadmus-lon-part-pg').then(
        (module) => module.CadmusLonPartPgModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  // cadmus - graph
  {
    path: 'graph',
    loadChildren: () =>
      import('@myrmidon/cadmus-graph-pg').then(
        (module) => module.CadmusGraphPgModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  // cadmus - preview
  {
    path: 'preview',
    loadChildren: () =>
      import('@myrmidon/cadmus-preview-pg').then(
        (module) => module.CadmusPreviewPgModule
      ),
    canActivate: [AuthJwtGuardService],
  },
  // cadmus - flags
  {
    path: 'flags',
    loadChildren: () =>
      import('@myrmidon/cadmus-flags-pg').then(
        (module) => module.CadmusFlagsPgModule
      ),
  },

  // fallback
  { path: '**', component: HomeComponent },
];
