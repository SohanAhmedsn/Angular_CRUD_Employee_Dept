using Microsoft.EntityFrameworkCore;
using R52_M10_Class_04_Work_02.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<EmployeeDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("db")));
builder.Services.AddCors(options => {
    options.AddPolicy("EnableCORS",
        builder => {
            builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();

        });
});
builder.Services.AddControllers()
    .AddNewtonsoftJson(option =>
{
    option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
    option.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
});
var app = builder.Build();

app.UseStaticFiles();
app.UseCors("EnableCORS");
app.MapControllers();


app.Run();
