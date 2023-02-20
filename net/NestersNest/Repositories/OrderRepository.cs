using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NestersNest.Data;
using NestersNest.Data.Entities.Dictionaries;
using NestersNest.Models;
using NestersNest.Models.Views;

namespace NestersNest.Repositories;

[Injectable]
public interface IOrderRepository
{
    public List<Order> GetAll();
    public Order Get(int id);
    public bool Add(Order order, bool autoCommit = true);
    public bool UpdateOrder(int id, Order order);
    public bool Delete(int id, bool autoCommit = true);

    public List<OrderView> GetOrderView(int companyId, int? userId, int orderTypeId);
    public IEnumerable<OrderStatus> GetAllOrderStatus();
}

public class OrderRepository: IOrderRepository
{
    private readonly DataContext _appDbContext;

    public OrderRepository(DataContext context)
    {
        _appDbContext = context;
    }
    
    public List<Order> GetAll()
    {
        if (_appDbContext.Order == null)
        {
            return null;
        }

        return _appDbContext.Order.AsNoTracking().ToList();
    }

    public Order Get(int id)
    {
        return _appDbContext.Order.AsNoTracking().First(x => x.Id == id);
    }

    public bool Add(Order order, bool autoCommit = true)
    {
        if (_appDbContext.Order == null)
        {
            return false;
        }
        _appDbContext.Order.Add(order);
        if (autoCommit)
        {
            _appDbContext.SaveChanges(); 
        }
        return true;
    }

    public bool UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
        {
            return false;
        }

        _appDbContext.Entry(order).State = EntityState.Modified;

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

    public bool Delete(int id, bool autoCommit = true)
    {
        if (_appDbContext.Order == null)
        {
            return false;
        }
        var order =  _appDbContext.Order.AsNoTracking().FirstOrDefault(x => x.Id == id);
        if (order == null)
        {
            return false;
        }

        _appDbContext.Order.Remove(order);

        if (autoCommit)
        {
            _appDbContext.SaveChangesAsync();   
        }

        return true;
    }

    public List<OrderView> GetOrderView(int companyId, int? userId, int orderTypeId)
    {
        using (_appDbContext)
        {
                var sqlQuery = $"SELECT * FROM [dbo].[fntOrderView](@companyId, @userId, @orderTypeId)";
                
                var listParameters = new List<SqlParameter>();
                listParameters.Add(new SqlParameter("companyId", SqlDbType.VarChar) {Value = companyId});
                listParameters.Add(new SqlParameter("userId", SqlDbType.VarChar) {Value = userId != null? userId: string.Empty});
                listParameters.Add(new SqlParameter("orderTypeId", SqlDbType.Int) {Value = orderTypeId});

                if (userId != null)
                {
                    sqlQuery = sqlQuery + ("AND o.DriverId = @userId");
                }
                
                var result = _appDbContext.OrderView?.FromSqlRaw(sqlQuery, listParameters.ToArray()).OrderByDescending(o => o.Id).AsNoTracking().ToList();

                return result;
        }
    }

    public IEnumerable<OrderStatus> GetAllOrderStatus()
    {
        return _appDbContext.OrderStatus.AsNoTracking();
    }

    private bool OrderExists(int id)
    {
        return (_appDbContext.Order?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}