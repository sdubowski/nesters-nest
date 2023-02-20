using Microsoft.AspNetCore.Identity;
using NestersNest.Data.Entities;

namespace NestersNest.Models;

public class User: IdentityUser
{
    public int CompanyId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int AddressId { get; set; }
    public Address Address { get; set; }
}