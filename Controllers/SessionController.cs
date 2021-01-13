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

        public IActionResult CreateSession(Session session)
        {
            return Ok(_sessionService.CreateSession(session));
        }

        public IActionResult GetSession(Guid sessionGuid)
        {
            return Ok(_sessionService.GetSession(sessionGuid));
        }

        public IActionResult UpdateSession([FromBody] Session session)
        {
            _sessionService.UpdateSession(session);
            return Ok();
        }
    }
}
