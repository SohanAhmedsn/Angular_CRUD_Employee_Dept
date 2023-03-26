import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Department } from 'src/app/models/data/department';
import { NotifyService } from 'src/app/services/common/notify.service';
import { DepartmentService } from 'src/app/services/data/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit{
 departments:Department[] =[];
 dataSource:MatTableDataSource<Department> = new MatTableDataSource(this.departments);
 columnList = ['departmentName', 'actions'];
 @ViewChild(MatSort, {static:false}) sort!:MatSort;
 @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
 constructor(
  private departmentSvc:DepartmentService,
  private notifySvc:NotifyService,
  private matDialog: MatDialog
  ){}
  confirmDelete(item:Department){
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
    .subscribe({
      next:r=>{
        if(r){
          this.departmentSvc.delete(Number(item.departmentId))
          .subscribe({
            next:r=>{
              this.dataSource.data = this.dataSource.data.filter(x=> x.departmentId != item.departmentId);
            }
            ,
            error: err=>{
              this.notifySvc.notify("Failed to delete", "DISMISS");
            }
          })
        }
      }
    })
  }
  ngOnInit(): void {
     this.departmentSvc.get()
     .subscribe({
      next: r=>{
        this.departments = r;
        this.dataSource.data = this.departments;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>{
        console.log(err.message || err);
      }
     })
  }
}
