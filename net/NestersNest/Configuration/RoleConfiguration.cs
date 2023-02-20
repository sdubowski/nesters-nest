using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NestersNest.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Name = "Forwarder",
                NormalizedName = "FORWARDER"
            },
            new IdentityRole
            {
                Name = "Driver",
                NormalizedName = "DRIVER"
            });
    }
}