using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Models.ApiResponseModels
{
    public class LoginResponseModel
    {
        public string UserGuid { get; set; }
        public string TokenString { get; set; }
    }
}
