import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
//import { ProductBacklogComponent } from './components/product-backlog/product-backlog.component';
import { BacklogsComponent } from './components/backlogs/backlogs.component';
import { RtmComponent } from './components/rtm/rtm.component';
import { GuidesPageComponent } from './components/guides-page/guides-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'guides', component: GuidesPageComponent },
  // { path: 'about', component: GuidesPageComponent },
  
  //{ path: 'dashboard/:id', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  { path: 'dashboard/project-detail', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'project-detail/product-backlog', component: BacklogsComponent, canActivate: [AuthGuard] },
  { path: 'project-detail/sprint-backlog/:sb_id', component: BacklogsComponent, canActivate: [AuthGuard] },
  
  { path: 'dashboard/shared-project', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'shared-project/product-backlog', component: BacklogsComponent, canActivate: [AuthGuard] },
  { path: 'shared-project/sprint-backlog/:sb_id', component: BacklogsComponent, canActivate: [AuthGuard] },
  
  { path: 'rtm', component: RtmComponent, canActivate: [AuthGuard] },
  { path: 'rtm/:id', component: RtmComponent, canActivate: [AuthGuard] },

  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
