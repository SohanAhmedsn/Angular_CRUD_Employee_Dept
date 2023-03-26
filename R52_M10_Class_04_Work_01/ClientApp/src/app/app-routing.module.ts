import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DepartmentViewComponent } from './components/department/department-view/department-view.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'departments', component: DepartmentViewComponent },
  { path: 'department-create', component: DepartmentCreateComponent },
  { path: 'department-edit/:id', component: DepartmentEditComponent },
  { path: 'employees', component: EmployeeViewComponent },
  { path: 'employee-create', component: EmployeeCreateComponent },
  { path: 'employee-edit/:id', component: EmployeeEditComponent }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
