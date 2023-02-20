using System.Runtime.InteropServices;
using AutoMapper;
using NestersNest.Data.Entities.Dictionaries;
using NestersNest.Enums;
using NestersNest.Models;
using NestersNest.Models.Views;
using NestersNest.Repositories;

namespace NestersNest.Services;

[Injectable]
public interface IOrderService
{
    public List<OrderModel> GetAll();
    public OrderModel Get(int id);
    public bool Add(OrderModel order);
    public bool UpdateOrder(int id, OrderModel order);
    public bool Delete(int id);
    public List<OrderView> GetOrderView(int companyId, int? userId, int orderTypeId);
    public OrderModel CreateOrder();
    public List<OrderStatus> GetAllOrderStatus();
}

public class OrderService: IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public OrderService(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }
    
    public List<OrderModel> GetAll()
    {
        return _mapper.Map<List<OrderModel>>(_orderRepository.GetAll());
    }

    public OrderModel Get(int id)
    {
        return _mapper.Map<OrderModel>(_orderRepository.Get(id));
    }

    public bool Add(OrderModel order)
    {
        return _orderRepository.Add(_mapper.Map<Order>(order));
    }

    public bool UpdateOrder(int id, OrderModel order)
    {
        return _orderRepository.UpdateOrder(id, _mapper.Map<Order>(order));
    }

    public bool Delete(int id)
    {
        return _orderRepository.Delete(id);
    }
    

    public List<OrderView> GetOrderView(int companyId, int? userId, int orderTypeId)
    {
        return _orderRepository.GetOrderView(companyId, userId, orderTypeId);
    }

    public OrderModel CreateOrder()
    {
        var order = new OrderModel
        {
            CreationDate = DateTime.UtcNow,
            UserId = "748b6773-17d9-4de9-ab37-0ead008ac564",
            CompanyId = 1,
            OrderTypeId = OrderTypeEnum.Standard,
            OrderStatusId = OrderStatusEnum.Draft
        };

        return order;
    }

    public List<OrderStatus> GetAllOrderStatus()
    {
        return _orderRepository.GetAllOrderStatus().ToList();
    }
}