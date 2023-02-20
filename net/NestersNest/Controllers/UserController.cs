using System.Web.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NestersNest.Models;
using NestersNest.Services;

namespace NestersNest.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("GetCurrentUser/{id}")]
        public async Task<ActionResult<UserModel>> GetCurrentUser(string id)
        {
            var user = _userService.Get(id);
            return Ok(user);
        }

        // GET: api/User
        [Microsoft.AspNetCore.Mvc.HttpGet]
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
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(string id)
        {
            var user = _userService.Get(id);
            return Ok(user);
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Microsoft.AspNetCore.Mvc.HttpPut("{id}")]
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
        [Microsoft.AspNetCore.Mvc.HttpPost]
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
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = _userService.Delete(id);

            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
