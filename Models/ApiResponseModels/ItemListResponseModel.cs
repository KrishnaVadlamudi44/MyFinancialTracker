using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Models.ApiResponseModels
{
    public class ItemListResponseModel
    {
        public Guid UserGuid { get; set; }

        public string InstitutionId { get; set; }

        public string InstitutionName { get; set; }

    }
}
