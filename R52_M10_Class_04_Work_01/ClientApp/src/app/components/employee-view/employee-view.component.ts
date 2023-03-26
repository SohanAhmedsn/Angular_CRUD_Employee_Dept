import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Grade } from 'src/app/models/app-constants';
import { Employee } from 'src/app/models/data/employee';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeService } from 'src/app/services/data/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employees:Employee[]=[];
  dataSource:MatTableDataSource<Employee>= new MatTableDataSource(this.employees);
  columnList= ['employeeName', 'grade', 'designation', 'departmentId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private employeeSvc: EmployeeService,
  private notifyService:NotifyService
  ){  }
  getGradeName(g:number){
    return Grade[g];
  }
  ngOnInit(): void {
    this.employeeSvc.getWithDepartment()
    .subscribe({
      next:r=>{
        this.employees=r;
        console.log(this.employees)
        this.dataSource.data = this.employees;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      }
      ,error:err=>{
        this.notifyService.notify("Failed to load employees", "DISMISS"),
        throwError(()=> err.message||err);
      }
    })
  }
}
