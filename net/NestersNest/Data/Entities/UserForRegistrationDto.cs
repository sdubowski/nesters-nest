using System.ComponentModel.DataAnnotations;

namespace NestersNest.Data.Entities;

public class UserForRegistrationDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
        
    [Microsoft.Build.Framework.Required]
    public string? Email { get; set; }
        
    [Microsoft.Build.Framework.Required]
    public string? Password { get; set; }
        
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string? ConfirmPassword { get; set; }
}