import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

import { LoginComponent } from './profile-page/login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './profile-page/register/register.component';
import { WallListComponent } from './wall-list/wall-list.component';
import { WallViewComponent } from './wall-view/wall-view.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { WallManagerComponent } from './wall-manager/wall-manager.component';
import { ChangePasswordComponent } from './profile-page/change-password/change-password.component';
import { RouteGraphsComponent } from './route-graphs/route-graphs.component';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset/:resetToken', component: ChangePasswordComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'wallManager', component: WallManagerComponent},
  { path: 'overview', component: FloorplanComponent},
  { path: 'home', component: LandingComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'patches', component: PatchNotesComponent},
  { path: 'graph', component: RouteGraphsComponent},
  { path: 'wall-list', component: WallListComponent },
  { path: 'wall-view/:id', component: WallViewComponent },
  { path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
