using System.ComponentModel.DataAnnotations;

namespace NestersNest.Models;

public class UserLoginModel
{
    [Microsoft.Build.Framework.Required]
    [EmailAddress]
    public string Email { get; set; }
    [Microsoft.Build.Framework.Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}