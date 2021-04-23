using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyFinancialTracker.Data.Entities;
using MyFinancialTracker.Helpers;
using MyFinancialTracker.Models;
using MyFinancialTracker.Models.ApiRequestModels;
using MyFinancialTracker.Models.ApiResponseModels;
using MyFinancialTracker.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyFinancialTracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private ISessionService _sessionService;
        private IPlaidService _plaidService;
        private ILogger _logger;
        private readonly AppSettings _appSettings;
        public UsersController(IUserService userService, ISessionService sessionService, IPlaidService plaidService, ILogger logger, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _sessionService = sessionService;
            _plaidService = plaidService;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequestModel model)
        {
            try
            {
                // create user
                var createdUserGuid = _userService.Create(model, model.Password);
                return Ok(new RegisterResponseModel()
                {
                    CreatedUserGuid = createdUserGuid.ToString()
                });
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] LoginRequestModel model)
        {
            try
            {
                var user = _userService.Authenticate(model.UserName, model.Password);

                var session = _sessionService.CreateSession(user.UserGuid);

                var tokenString = JwtTokenHandler.CreateJwtToken(user.UserGuid, session.Expiry, _appSettings.Secret);

                return Ok(new LoginResponseModel()
                {
                    SessionGuid = session.SessionUuid.ToString(),
                    TokenString = tokenString,
                    SessionExpiry = session.Expiry
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("items")]
        public IActionResult GetItems()
        {
            var itemsList = new List<ItemListResponseModel>();
            var itemsForUser = _userService.GetItemsForUser();    

            foreach (var item in itemsForUser)
            {
                var institutionInfo = _plaidService.GetInstitutionById(item.InstitutionId);

                if (institutionInfo.Result.IsSuccessStatusCode)
                {
                    itemsList.Add(new ItemListResponseModel()
                    {
                        InstitutionId = institutionInfo.Result.Institution.Id,
                        InstitutionName = institutionInfo.Result.Institution.Name
                    });
                }
            }

            if(itemsList.Count > 0)
            {
                return Ok(itemsList);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("items/{institutionId}")]
        public IActionResult RemoveItem(string institutionId)
        {
            _userService.RemoveItemForUser(institutionId);

            return Ok();
        }

    }
}
