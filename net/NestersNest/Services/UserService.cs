using System.Runtime.InteropServices;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using NestersNest.Models;
using NestersNest.Repositories;

namespace NestersNest.Services;

[Injectable]
public interface IUserService
{
    public List<UserModel> GetAll();
    public UserModel Get(string id);
    public bool Add(UserModel user);
    public bool UpdateOrder(string id, UserModel user);
    public bool Delete(string id);
    public User GetUser(ClaimsPrincipal principalUser);
    public List<UserModel> GetDriversByCompany(int companyId);

}

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager, IMapper mapper)
    {
        _userRepository = userRepository;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _mapper = mapper;
    }
    
    public List<UserModel> GetAll()
    {
        return _mapper.Map<List<UserModel>>(_userRepository.GetAll());
    }

    public UserModel Get(string id)
    {
        var user = _mapper.Map<UserModel>(_userRepository.Get(id));
        user.RoleId = _userRepository.GetUserRole(id).Id;
        return user;
    }

    public bool Add(UserModel user)
    {
        return _userRepository.Add(_mapper.Map<User>(user));
    }

    public bool UpdateOrder(string id, UserModel user)
    {
        return _userRepository.UpdateOrder(id, _mapper.Map<User>(user));
    }

    public bool Delete(string id)
    {
        return _userRepository.Delete(id);
    }
    
    public User GetUser(ClaimsPrincipal principalUser)
    {
        var user = _userManager.GetUserAsync(principalUser).Result;
        return user;
    }

    public List<UserModel> GetDriversByCompany(int companyId)
    {
        return _mapper.Map<List<UserModel>>(_userRepository.GetDriversByCompany(companyId)); 
    }
}