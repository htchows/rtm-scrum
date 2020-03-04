import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';


import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:id', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
