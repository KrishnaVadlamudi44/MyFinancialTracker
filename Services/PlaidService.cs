using Acklann.Plaid;
using Acklann.Plaid.Accounts;
using Acklann.Plaid.Entity;
using Acklann.Plaid.Institution;
using Acklann.Plaid.Item;
using Acklann.Plaid.Management;
using Acklann.Plaid.Transactions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyFinancialTracker.Data;
using MyFinancialTracker.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Acklann.Plaid.Institution.SearchAllRequest;

namespace MyFinancialTracker.Services
{
    public interface IPlaidService
    {
        Task<SearchResponse> GetInstitutions();
        Task<SearchResponse> GetInstitutionsByName(string nameQuery);
        Task<SearchByIdResponse> GetInstitutionById(string id);
        Task<CreateLinkTokenResponse> GetLinkToken(Guid userGuid);
        Task<string> CreateItem(string publicToken, Guid userGuid);
        Task<List<Account>> GetAccountsForUser(Guid accessToken);
    }
    public class PlaidService : IPlaidService
    {
        private readonly string _clientID;
        private readonly string _secret;
        private string _accessToken;
        private readonly ILogger<PlaidService> _logger;
        private readonly PlaidClient _plaidClient;
        private readonly MyFinancialTrackerDbContext _dbContext;
        public PlaidService(IConfiguration config, ILogger<PlaidService> logger, MyFinancialTrackerDbContext dbContext)
        {
            _clientID = config["plaid:clientID"];
            _secret = config["plaid:secret"];
            _accessToken = config["plaid:accessToken"];
            _logger = logger;

           _plaidClient = new PlaidClient(config["Plaid:ClientID"], config["Plaid:Secret"], _accessToken, environment: Acklann.Plaid.Environment.Sandbox, logger: _logger);

            _dbContext = dbContext;
        }

        #region Institutions
        public async Task<SearchResponse> GetInstitutions()
        {
            var response = await _plaidClient.FetchAllInstitutionsAsync(new SearchAllRequest()
            {
                ClientId = _clientID,
                Secret = _secret,
                Take = 10,
                CountryCodes = new string[] { "US" },
                Options = new SearchAllRequest.AdditionalOptions()
                {
                    InclueMetadata = true
                }
            });

            if (response.IsSuccessStatusCode)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        public async Task<SearchResponse> GetInstitutionsByName(string nameQuery)
        {
            var response = await _plaidClient.FetchInstitutionsAsync(new SearchRequest()
            {
                ClientId = _clientID,
                Secret = _secret,
                Query = nameQuery,
                CountryCodes = new string[] { "US" },
                Options = new SearchRequest.AdditionalOptions()
                {
                    InclueMetadata = true
                }
            });

            if (response.IsSuccessStatusCode)
            {
                return response;
            }
            else { return null; }
        }

        public async Task<SearchByIdResponse> GetInstitutionById(string id)
        {
            var response = await _plaidClient.FetchInstitutionByIdAsync(new SearchByIdRequest()
            {
                ClientId = _clientID,
                Secret = _secret,
                InstitutionId = id,
                CountryCodes = new string[] { "US" },
                Options = new SearchByIdRequest.AdditionalOptions()
                {
                    InclueMetadata = true,
                    IncludeStatus = true
                }
            });

            if (response.IsSuccessStatusCode)
            {
                return response;
            }
            else { return null; }
        }

        #endregion

        public async Task<CreateLinkTokenResponse> GetLinkToken(Guid userGuid)
        {
            var response = await _plaidClient.CreateLinkToken(new CreateLinkTokenRequest()
            {
                ClientName = "My Financial Tracker",
                Language = "en",
                CountryCodes = new string[1] { "US" },
                User = new CreateLinkTokenRequest.UserInfo { ClientUserId = userGuid.ToString() },
                Products = new string[1] { "auth" }
            });

            if (response.IsSuccessStatusCode)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        public async Task<string> CreateItem(string publicToken, Guid userguid)
        {
            var exchangeToken = await _plaidClient.ExchangeTokenAsync(new ExchangeTokenRequest()
            {
                PublicToken = publicToken
            });

            var ItemInfo = await _plaidClient.FetchItemAsync(new GetItemRequest()
            {
                AccessToken = exchangeToken.AccessToken
            });


            if (exchangeToken.IsSuccessStatusCode && ItemInfo.IsSuccessStatusCode)
            {

                _dbContext.Items.Add(new Data.Entities.Item()
                {
                    ItemId = exchangeToken.ItemId,
                    AccessToken = exchangeToken.AccessToken,
                    InstitutionId = ItemInfo.Item.InstitutionId,
                    UserGuid = userguid
                });

                await _dbContext.SaveChangesAsync();

                return exchangeToken.ItemId;
            }
            else
            {
                return null;
            }

        }

        public async Task<List<Account>> GetAccountsForUser(Guid userguid)
        {
            var itemsForUser = _dbContext.Items.Where(x=>x.UserGuid == userguid);
            var accountsForUser = new List<Account>();

            foreach(var item in itemsForUser)
            {
                var accounts = await _plaidClient.FetchAccountAsync(new GetAccountRequest()
                {
                    AccessToken = item.AccessToken
                });

                if (accounts.IsSuccessStatusCode)
                {
                    for(int i = 0; i<= accounts.Accounts.Length-1; i++)
                    {
                        accountsForUser.Add(accounts.Accounts[i]);
                    }
                }
            };
            

            if (accountsForUser.Count > 0)
            {
                return accountsForUser;
            }
            else
            {
                return null;
            }
        }

    }
}
