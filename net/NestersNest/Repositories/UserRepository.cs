using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NestersNest.Data;
using NestersNest.Data.Entities;
using NestersNest.Data.Entities.Dictionaries;
using NestersNest.Models;

namespace NestersNest.Repositories;

[Injectable]
public interface IUserRepository
{
    public List<User> GetAll();
    public User Get(string id);
    public bool Add(User user, bool autoCommit = true);
    public bool UpdateOrder(string id, User user);
    public bool Delete(string id, bool autoCommit = true);
    public IdentityRole<string> GetUserRole(string userId);
}

public class UserRepository: IUserRepository
{
    private readonly DataContext _appDbContext;

    public UserRepository(DataContext context)
    {
        _appDbContext = context;
    }
    
    public List<User> GetAll()
    {
        if (_appDbContext.Order == null)
        {
            return null;
        }

        return _appDbContext.User.AsNoTracking().ToList();
    }

    public User Get(string id)
    {
        return _appDbContext.User.AsNoTracking().Include(x => x.Address).First(x => x.Id == id);
    }

    public bool Add(User user, bool autoCommit = true)
    {
        if (_appDbContext.User == null)
        {
            return false;
        }
        _appDbContext.User.Add(user);
        if (autoCommit)
        {
            _appDbContext.SaveChanges(); 
        }
        return true;
    }

    public bool UpdateOrder(string id, User user)
    {
        if (id != user.Id)
        {
            return false;
        }

        _appDbContext.Entry(user).State = EntityState.Modified;

        try
        {
             _appDbContext.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
            {
                return false;
            }
            else
            {
                throw;
            }
        }
        return true;
    }

    public bool Delete(string id, bool autoCommit = true)
    {
        if (_appDbContext.User == null)
        {
            return false;
        }
        var user =  _appDbContext.User.AsNoTracking().FirstOrDefault(x => x.Id == id);
        if (user == null)
        {
            return false;
        }

        _appDbContext.User.Remove(user);

        if (autoCommit)
        {
            _appDbContext.SaveChangesAsync();   
        }

        return true;
    }

    public IdentityRole<string> GetUserRole(string userId)
    {
        var role = _appDbContext.UserRoles.FirstOrDefault(x => x.UserId == userId);
        return _appDbContext.Roles.FirstOrDefault(x => role != null && x.Id == role.RoleId)!;
    }

    private bool OrderExists(string id)
    {
        return (_appDbContext.User?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}