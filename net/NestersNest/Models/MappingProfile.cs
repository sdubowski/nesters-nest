using AutoMapper;
using NestersNest.Data.Entities;

namespace NestersNest.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserForRegistrationDto, User>()
            .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        CreateMap<UserModel, User>();
        CreateMap<User, UserModel>();
        CreateMap<OrderModel, Order>();
        CreateMap<Order, OrderModel>();
        CreateMap<AddressModel, Address>();
        CreateMap<Address, AddressModel>();

    }
}