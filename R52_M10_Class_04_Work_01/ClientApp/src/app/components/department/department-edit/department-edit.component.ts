   import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/data/department';
import { NotifyService } from 'src/app/services/common/notify.service';
import { DepartmentService } from 'src/app/services/data/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit{
  department:Department = {};
  departmentForm:FormGroup = new FormGroup({
    departmentName:new FormControl('', [Validators.required, Validators.maxLength(50)])
  });
  constructor(
    private departmentSvc:DepartmentService,
    private notifySvc:NotifyService,
    private actvatedRoute:ActivatedRoute
  ){}
  get f(){
    return this.departmentForm.controls;
  }
  save(){
      if(this.departmentForm.invalid) return;
      Object.assign(this.department, this.departmentForm.value);
      this.departmentSvc.put(this.department)
      .subscribe({
        next:r=>{
          this.notifySvc.notify("Data updated successfully", "DISMISS");
        },
        error: err=>{
          this.notifySvc.notify("Failed to update data", "DISMISS")
        }
      })
  }
  ngOnInit(): void {
    let id:number = this.actvatedRoute.snapshot.params['id'];
    console.log(id);
    this.departmentSvc.getById(id)
    .subscribe({
      next:r=>{
        console.log(r);
        this.department=r;
        this.departmentForm.patchValue(this.department)
      }, error:err=>{
        console.log(err.message || err);
        this.notifySvc.notify("Failed to load department", "DISMISS");
      }
    })
  }

}
