namespace NestersNest.Models.Views;

public class OrderView
{
    public int Id { get; set; }
    public string OrderStatus { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? DriverName { get; set; }
    public string? UserName { get; set; }
    public string? CargoType { get; set; }
    public decimal? Mileage { get; set; }
}