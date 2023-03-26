import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/app-constants';
import { Department } from 'src/app/models/data/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http:HttpClient) { }
  get():Observable<Department[]>{
    return this.http.get<Department[]>(`${apiUrl}/api/Departments`);
  }
  getById(id:number):Observable<Department>{
    return this.http.get<Department>(`${apiUrl}/api/Departments/${id}`);
  }
  post(data:Department):Observable<Department>{
    return this.http.post<Department>(`${apiUrl}/api/Departments`, data);
  }
  put(data:Department):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Departments/${data.departmentId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Departments/${id}`);
  }
}
