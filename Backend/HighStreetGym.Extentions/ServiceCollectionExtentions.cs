using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HighStreetGym.Core.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HighStreetGym.Extentions
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection RepositoryRegister(this IServiceCollection services)
        {
            var asmCore = Assembly.Load("HighStreetGym.Core");
            var implementatationType = asmCore.GetTypes().FirstOrDefault(m => m.Name == "Repository`1");
            var interfaceType = implementatationType?.GetInterface("IRepository`1");
            services.AddTransient(typeof(IRepository<>), implementatationType);
            return services;
        }

        // public static IServiceCollection ServicesRegister(this IServiceCollection services)
        // {
        //     List<Assembly> assemblys = new();

        //     var provider = services.BuildServiceProvider();
        //     var configuration = provider.GetService<IConfiguration>();
        //     List<string> classes = configuration["IocClasses"].Split(",").ToList();

        //     classes.ForEach(c =>
        //     {
        //         assemblys.Add(Assembly.Load(c));
        //     });

        //     foreach (var assembly in assemblys)
        //     {
        //         var implementationTypes = assembly.GetTypes().Where(
        //             m => m.IsAssignableTo(typeof(IocTag)) &&
        //             !m.IsAbstract &&
        //             !m.IsInterface
        //         );
        //         foreach (var implementationType in implementationTypes)
        //         {
        //             var interfaceType = implementationType.GetInterfaces().Where(m => m != typeof(IocTag)).FirstOrDefault();
        //             services.AddTransient(interfaceType, implementationType);
        //         }
        //     }
        //     return services;
        // }

    }






}