import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/data/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/data/employee.service';
import { DepartmentService } from 'src/app/services/data/department.service';
import { NotifyService } from 'src/app/services/common/notify.service';
import { Department } from 'src/app/models/data/department';
import { Grade } from 'src/app/models/app-constants';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee:Employee={};
  departments:Department[] =[];
  gradeOptions:{label:string, value:number}[] =[];
  employeeForm:FormGroup = new FormGroup({
    employeeName:new FormControl('', Validators.required),
    grade:new FormControl(undefined, Validators.required),
    designation: new FormControl('', Validators.required),
    departmentId: new FormControl(undefined, Validators.required)
 });
 constructor(
  private employeeSvc: EmployeeService,
  private departmentSvc:DepartmentService,
  private notifyService:NotifyService
 ){}
 get f(){
  return this.employeeForm.controls;
 }
 save(){
  if(this.employeeForm.invalid) return;
  Object.assign(this.employee, this.employeeForm.value);
  this.employeeSvc.post(this.employee)
  .subscribe({
    next:r=>{
      this.notifyService.notify("Data save successfully", "DISMISS");
      this.employee={};
      this.employeeForm.reset({});
    },
    error:err=>{
      this.notifyService.notify("Failed to save employee", "DISMISS"),
      throwError(()=> err.message||err);
    }
  })
 }
  ngOnInit(): void {
    Object.keys(Grade).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.gradeOptions.push({ label:v, value: Number(Grade[v]) })
    });
    this.departmentSvc.get()
    .subscribe({
      next:r=>{
        this.departments=r;
      }
      ,error:err=>{
        this.notifyService.notify("Failed to load department", "DISMISS"),
        throwError(()=> err.message||err);
      }
    })
  }
}
