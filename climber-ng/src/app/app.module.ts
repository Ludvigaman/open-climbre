import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './profile-page/login/login.component';
import { WallViewComponent } from './wall-view/wall-view.component';
import { WallListComponent } from './wall-list/wall-list.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './profile-page/register/register.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChangePasswordComponent } from './profile-page/change-password/change-password.component';
import { WallManagerComponent } from './wall-manager/wall-manager.component';
import { AddWallComponent } from './wall-manager/add-wall/add-wall.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditWallComponent } from './wall-manager/edit-wall/edit-wall.component';
import { AddBuilderComponent } from './wall-manager/add-builder/add-builder.component';
import { RouteGraphsComponent } from './route-graphs/route-graphs.component';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WallViewComponent,
    WallListComponent,
    OverviewComponent,
    ProfilePageComponent,
    NavigationComponent,
    FooterComponent,
    RegisterComponent,
    LandingComponent,
    FloorplanComponent,
    SidenavComponent,
    ChangePasswordComponent,
    WallManagerComponent,
    AddWallComponent,
    EditWallComponent,
    AddBuilderComponent,
    RouteGraphsComponent,
    PatchNotesComponent,
    AdminComponent,
    ContactComponent
  ],
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
