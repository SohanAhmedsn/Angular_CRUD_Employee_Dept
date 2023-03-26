using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R52_M10_Class_04_Work_02.Models
{
    public enum Grade { G01 = 1, G02, M01, M02, Ex01, Ex02 }
    public class Department
    {
        public int DepartmentId { get; set; }
        [Required, StringLength(50)]
        public string DepartmentName { get; set; } = default!;
        public virtual ICollection<Employee> Employees { get; set; } =new List<Employee>();
    }
    public class Employee
    {
        public int EmployeeId { get; set; }
        [Required, StringLength(50)]
        public string EmployeeName { get; set; }=default!;
        [Required, EnumDataType(typeof(Grade))]
        public Grade Grade { get; set; }
        [Required, StringLength(50)]
        public string Designation { get; set; } = default!;
        [Required, ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public virtual Department? Department { get; set; }= default!;
    }
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }
        public DbSet<Department> Departments{ get; set; } = default!;
        public DbSet<Employee> Employees { get; set; } = default!;
    }
}
