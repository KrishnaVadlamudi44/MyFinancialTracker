using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFinancialTracker.Data.Entities;
using MyFinancialTracker.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpGet("{sessionGuid}")]
        public IActionResult GetSession(Guid sessionGuid)
        {
            return Ok(_sessionService.GetSession(sessionGuid));
        }

        [HttpPut("{sessionGuid}")]
        public IActionResult UpdateSession(string sessionGuid, [FromBody] Session session)
        {
            _sessionService.UpdateSession(new Guid(sessionGuid), session);
            return Ok();
        }
    }
}
