using NestersNest.Enums;

namespace NestersNest.Models;

public class Order
{
    public int Id { get; set; }
    public OrderStatusEnum OrderStatusId { get; set; }
    public string? DriverId { get; set; }
    public User? Driver { get; set; }
    public string StartPlace { get; set; }
    public string Destination { get; set; }
    public decimal Profit { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string UserId { get; set; }
    public int CompanyId { get; set; }
    public OrderTypeEnum OrderTypeId { get; set; }
    public string CargoType { get; set; }
    public decimal Mileage { get; set; }
    public decimal MileageRate { get; set; }
}