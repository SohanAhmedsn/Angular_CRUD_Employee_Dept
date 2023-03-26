import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/data/department';
import { NotifyService } from 'src/app/services/common/notify.service';
import { DepartmentService } from 'src/app/services/data/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent {
  department:Department = {};
  departmentForm:FormGroup = new FormGroup({
    departmentName:new FormControl('', [Validators.required, Validators.maxLength(50)])
  });
  constructor(
    private departmentSvc:DepartmentService,
    private notifySvc:NotifyService
  ){}
  get f(){
    return this.departmentForm.controls;
  }
  save(){
    if(this.departmentForm.invalid) return;
    Object.assign(this.department, this.departmentForm.value);
    //console.log(this.department);
    this.departmentSvc.post(this.department)
    .subscribe({
      next:r=>{
        //console.log(r);
        this.notifySvc.notify("Data saved successfully", 'DISMISS');
        this.department={};
        this.departmentForm.reset({});
        this.departmentForm.markAsPristine();
        this.departmentForm.markAsUntouched();
      },
      error:err=>{
        console.log(err);
        this.notifySvc.notify("Failed to save data", 'DISMISS');
      }
    })
  }
}
