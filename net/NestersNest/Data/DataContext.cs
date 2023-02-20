using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NestersNest.Configuration;
using NestersNest.Data.Entities;
using NestersNest.Data.Entities.Dictionaries;
using NestersNest.Models;
using NestersNest.Models.Views;

namespace NestersNest.Data;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions options) : base(options) { }

    public DbSet<Order> Order { get; set; }
    public DbSet<OrderView> OrderView { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<Company> Company { get; set; }
    public DbSet<OrderStatus> OrderStatus { get; set; }
    public DbSet<OrderType> OrderType { get; set; }
    public DbSet<Address> Address { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        
        modelBuilder.Entity<User>().ToTable("Users");
        modelBuilder.Entity<IdentityRole>().ToTable("Roles");
        modelBuilder.Entity<OrderStatus>().ToTable("OrderStatus", schema: "dict");
        modelBuilder.Entity<OrderType>().ToTable("OrderType", schema: "dict");
    }
}