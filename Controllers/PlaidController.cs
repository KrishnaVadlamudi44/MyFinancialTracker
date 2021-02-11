using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyFinancialTracker.Models;
using MyFinancialTracker.Models.ApiRequestModels;
using MyFinancialTracker.Services;
using System;
using System.Threading.Tasks;

namespace MyFinancialTracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlaidController : ControllerBase
    {
        private readonly IPlaidService _plaidService;
        private readonly AppSettings _appSettings;
        public PlaidController(IPlaidService plaidService, IOptions<AppSettings> appSettings)
        {
            _plaidService = plaidService;
            _appSettings = appSettings.Value;
        }

        [HttpGet("institutions")]
        public async Task<IActionResult> GetInstitutions()
        {
            return Ok(await _plaidService.GetInstitutions());
        }

        [HttpGet("getLinkToken/{userGuid}")]
        public async Task<IActionResult> GetLinkToken(string userGuid)
        {

            var linkTokenInfo = await _plaidService.GetLinkToken(new Guid(userGuid));
            
            if (linkTokenInfo != null)
            {
                return Ok(linkTokenInfo);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("createItem")]
        public async Task<IActionResult> CreateItem([FromBody] TokenModel publicToken)
        {
            var item = await _plaidService.CreateItem(publicToken.PublicToken, publicToken.UserGuid);

            if(item != null)
            {
                return Ok(item);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getAccounts/{userGuid}")]
        public async Task<IActionResult> GetAccounts(string userGuid)
        {
            var accounts = await _plaidService.GetAccountsForUser(new Guid(userGuid));

            if(accounts != null)
            {
                return Ok(accounts);
            }
            else
            {
                return NotFound();
            }
        }

    }
}
