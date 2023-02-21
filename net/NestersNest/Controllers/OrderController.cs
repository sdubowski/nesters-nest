using Microsoft.AspNetCore.Mvc;
using NestersNest.Models;
using NestersNest.Services;

namespace NestersNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Order
        [HttpGet]
        public IActionResult GetOrder()
        {
            var orders = _orderService.GetAll();
            if (!orders.Any())
            {
                return NoContent();
            }

            return Ok(orders);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _orderService.Get(id);
            return Ok(order);
        }
        
        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, OrderModel order)
        {
            var result = _orderService.UpdateOrder(id, order);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
        
        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostOrder([FromBody] OrderModel order)
        {
            var result = _orderService.Add(order);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
        
        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var result = _orderService.Delete(id);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
        
        // GET: api/OrderView
        [HttpGet("GetOrderView")]
        public IActionResult GetOrderView([FromQuery] string userId)
        {
            var result = _orderService.GetOrderView(userId);

            if (result.Any())
            {
                return Ok(result);
            }

            return NotFound();
        }
        
        // GET: api/OrderView
        [HttpGet("GetTransportExchangeView")]
        public IActionResult GetTransportExchangeView()
        {
            var result = _orderService.GetTransportExchangeView();

            if (result.Any())
            {
                return Ok(result);
            }

            return NotFound();
        }
        
        // GET: api/Order/CreateOrder
        [HttpGet("CreateOrder")]
        public IActionResult CreateOrder()
        {
            var order = _orderService.CreateOrder();
            return Ok(order);
        }
        
        // GET: api/Order/CreateOrder
        [HttpGet("GetAllOrderStatus")]
        public IActionResult GetAllOrderStatus()
        {
            var statusList = _orderService.GetAllOrderStatus();
            return Ok(statusList);
        }
        
        [HttpPut("TakeOrder/{id}")]
        public IActionResult TakeOrder(int id, OrderModel order)
        {
            var result = _orderService.TakeOrder(id, order);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }


    }
}
