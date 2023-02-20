using Microsoft.Build.Framework;

namespace NestersNest.Data.Entities;

public class UserForAuthenticationDto
{
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
}