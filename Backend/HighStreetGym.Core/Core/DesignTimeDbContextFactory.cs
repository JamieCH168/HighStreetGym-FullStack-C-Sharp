using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace HighStreetGym.Core.Core
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<HighStreetGymDbContext>
    {
        public HighStreetGymDbContext CreateDbContext(string[] args)
        {

            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "../HighStreetGym.WebAPI");

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json")
                .Build();

            // 获取环境变量中指定的路径
            // string appSettingsPath = Environment.GetEnvironmentVariable("APP_SETTINGS_PATH");

            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .SetBasePath(appSettingsPath) // 使用环境变量中的路径作为基础路径
            //     .AddJsonFile("appsettings.json")
            //     .Build();

            // string appSettingsPath = Environment.GetEnvironmentVariable("APP_SETTINGS_PATH");

            // // 添加一个检查来确保环境变量被正确读取
            // if (string.IsNullOrEmpty(appSettingsPath))
            // {
            //     throw new InvalidOperationException("The APP_SETTINGS_PATH environment variable is not set.");
            // }

            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .SetBasePath(appSettingsPath) // 使用环境变量中的路径作为基础路径
            //     .AddJsonFile("appsettings.json")
            //     .Build();


            var optionsBuilder = new DbContextOptionsBuilder<HighStreetGymDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Default"));

            return new HighStreetGymDbContext(optionsBuilder.Options);
        }

    }
}