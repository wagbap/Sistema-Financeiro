using System.Text.Json.Serialization;
using WebAPI_CRUD.Helpers;
using WebAPI_CRUD.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;  // Necessary for Entity Framework Core
using AutoMapper;
using System;

// Avoid conflicting DataContext names by specifying an alias
using DataContext = WebAPI_CRUD.Helpers.DataContext;

var builder = WebApplication.CreateBuilder(args);

// Configuration and Environment
var services = builder.Services;
var env = builder.Environment;

// Add services to the container.
services.AddControllersWithViews();

// Database context using EF Core and SQL Server
services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS configuration
services.AddCors();

// Controller and JSON options
services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());  // Serialize enums as strings
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;  // Ignore null values
});

// AutoMapper configuration
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Application services

services.AddScoped<IItemService, ItemService>();


// Build the app
var app = builder.Build();

// Middleware pipeline configuration
if (!env.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts(); // Consider adjusting this based on your production scenario
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Global CORS policy
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthorization();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.MapControllers();

// Default route configuration
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
