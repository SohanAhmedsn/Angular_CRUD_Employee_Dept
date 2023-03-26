import { Grade } from "../app-constants";
import { Department } from "./department";

export interface Employee {
    employeeId?:number;
    employeeName?:string;
    grade?:Grade;
    designation?:string;
    departmentId?:number;
    department?:Department;
}
