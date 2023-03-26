import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/app-constants';
import { Employee } from 'src/app/models/data/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  constructor(
    private http:HttpClient
   

  ) { }
  getWithDepartment():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${apiUrl}/api/Employees/Include`);
  }
  post(data:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${apiUrl}/api/Employees`, data);
  }
}
