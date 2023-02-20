using Microsoft.AspNetCore.Identity;

namespace NestersNest.Models;

public class UserModel: IdentityUser
{
    public int CompanyId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string RoleId { get; set; }
    public AddressModel Address { get; set; }
}