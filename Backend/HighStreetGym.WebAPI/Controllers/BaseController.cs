using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighStreetGym.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class BaseController : ControllerBase
    {

    }
}