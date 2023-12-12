using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Services;


    /* This web-api is built upon Jason Watmores .Net Web API base (2022), extended by Ludvig Aman (2023), see LICENSE for more info! */

    var builder = WebApplication.CreateBuilder(args);

    var services = builder.Services;
 
    services.AddDbContext<DataContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase")));
 
    services.AddCors();
    services.AddControllers();

    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

    services.AddSwaggerGen();

    // configure automapper with all automapper profiles from this assembly
    services.AddAutoMapper(typeof(Program));

    // configure strongly typed settings object
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
    services.Configure<EmailSettings>(builder.Configuration.GetSection("MailSettings"));


services.AddHttpContextAccessor();

    // configure DI for application services
    services.AddTransient<IJwtUtils, JwtUtils>();
    services.AddTransient<IUserService, UserService>();
    services.AddTransient<IWallService, WallService>();
    services.AddTransient<IEmailService, EmailService>();


var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();

    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();

    //app.Run(); //PROD
    app.Run("http://localhost:4000");