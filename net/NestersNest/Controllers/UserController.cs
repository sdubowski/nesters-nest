using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NestersNest.Models;
using NestersNest.Services;

namespace NestersNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetCurrentUser/{id}")]
        public async Task<ActionResult<UserModel>> GetCurrentUser(string id)
        {
            var user = _userService.Get(id);
            return Ok(user);
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUser()
        {
            var users = _userService.GetAll();
            if (!users.Any())
            {
                return NoContent();
            }

            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(string id)
        {
            var user = _userService.Get(id);
            return Ok(user);
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, UserModel user)
        {
            var result = _userService.UpdateOrder(id, user);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserModel user)
        {
            var result = _userService.Add(user);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = _userService.Delete(id);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
        
        [HttpGet("GetDriversByCompany/{companyId:int}")]
        public async Task<IActionResult> GetDriversByCompany(int companyId)
        {
            var result = _userService.GetDriversByCompany(companyId);

            if (result.Any())
            {
                return Ok(result);
            }

            return NotFound();
        }
    }
}
