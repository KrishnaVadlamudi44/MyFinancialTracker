using AutoMapper;
using MyFinancialTracker.Data.Entities;
using MyFinancialTracker.Models;
using MyFinancialTracker.Models.ApiRequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterRequestModel, User>();
            CreateMap<RegisterRequestModel, UserInfo>().ForMember(dest => dest.Email, opt => opt.MapFrom(source => source.UserName));
        }
    }
}
