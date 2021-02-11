using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Models.ApiRequestModels
{
    public class TokenModel
    {
        public string PublicToken { get; set; }
        public Guid UserGuid { get; set; }
    }
}
