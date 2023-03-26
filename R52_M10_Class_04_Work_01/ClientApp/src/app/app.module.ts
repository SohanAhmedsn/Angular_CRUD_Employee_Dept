import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { DepartmentService } from './services/data/department.service';
import { EmployeeService } from './services/data/employee.service';
import { DepartmentViewComponent } from './components/department/department-view/department-view.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyService } from './services/common/notify.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    DepartmentViewComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    ConfirmDialogComponent,
    EmployeeViewComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    LayoutModule,
    MatImportModule,
    AppRoutingModule,
    NgMaterialMultilevelMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [
    HttpClient, 
    MultilevelMenuService, 
    DepartmentService, 
    EmployeeService, 
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
