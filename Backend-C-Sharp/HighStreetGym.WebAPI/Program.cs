using System.Xml;
using HighStreetGym.Core.Core;
using HighStreetGym.Core.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using HighStreetGym.Service.UserService;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using HighStreetGym.Service.UserService.Dto;
using Microsoft.OpenApi.Any;
using HighStreetGym.Extentions;
using HighStreetGym.Common.TokenModule.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using HighStreetGym.Service;
using HighStreetGym.Service.RoomService;
using HighStreetGym.Service.BookingService;
using HighStreetGym.Service.ClassService;
using HighStreetGym.Service.BlogPostService;
using HighStreetGym.Service.ActivityService;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "HighStreetGym", Version = "v1" });
    c.SchemaFilter<DefaultValuesSchemaFilter>();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Formatting:Bearer{token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },new string[]{}
        }
    });
});


builder.Services.AddCors(c => c.AddPolicy("allowAnyOriginPolicy", p =>
   p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()

));

var token = builder.Configuration.GetSection("Jwt").Get<JwtTokenModel>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    opt =>
    {
        opt.RequireHttpsMetadata = false;
        opt.SaveToken = true;
        opt.TokenValidationParameters = new()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Security)),
            ValidIssuer = token.Issuer,
            ValidAudience = token.Audience,
        };
        opt.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();
                var res = "{\"code\":401,\"err\":\"No access rights\"}";
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                // context.Response.StatusCode = StatusCodes.Status203NonAuthoritative;
                context.Response.WriteAsync(res);
                return Task.FromResult(0);
            }
        };
    }
);

builder.Services.AddDbContext<HighStreetGymDbContext>((serviceProvider, options) =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    options.UseSqlServer(configuration.GetConnectionString("Default"));
});
// builder.Services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
builder.Services.RepositoryRegister();
builder.Services.AddAutoMapper(typeof(HighStreetGymProfile));
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IRoomService, RoomService>();
builder.Services.AddTransient<IBookingService, BookingService>();
builder.Services.AddTransient<IClassService, ClassService>();
builder.Services.AddTransient<IBlogPostService, BlogPostService>();
builder.Services.AddTransient<IActivityService, ActivityService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("allowAnyOriginPolicy");
app.UseAuthentication();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();


public class DefaultValuesSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type == typeof(UserLoginDto))
        {
            schema.Default = new OpenApiObject
            {
                ["user_email"] = new OpenApiString("111"),
                ["user_password"] = new OpenApiString("222"),
            };
        }
    }
}