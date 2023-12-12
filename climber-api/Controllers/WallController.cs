using WebApi.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WallController : ControllerBase
    {
        private IWallService _wallService;

        public WallController(IWallService wallService)
        {
            _wallService = wallService;
        }

        [AllowAnonymous]
        [HttpGet("all")]
        public IActionResult GetWalls()
        {
            var walls = _wallService.GetWalls().Result;
            return Ok(walls);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetWall([FromRoute] Guid id)
        {
            var wall = _wallService.GetWall(id).Result;
            return Ok(wall);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWall([FromBody] Wall wall)
        {
            wall.Id = Guid.NewGuid();
            var returnWall = await _wallService.CreateWall(wall);
            return Ok(returnWall);
        }

        [HttpPost("modify")]
        public async Task<IActionResult> ModifyWall([FromBody] Wall wall)
        {
            var returnWall = await _wallService.ModifyWall(wall);
            return Ok(returnWall);
        }

        [HttpGet("disable/{id}")]
        public async Task<IActionResult> DisableWall([FromRoute] Guid id)
        {
            var response = await _wallService.MarkWallAsRemoved(id);
            return Ok(response);
        }

        [HttpGet("remove/{id}")]
        public async Task<IActionResult> RemoveWall([FromRoute] Guid id)
        {
            var response = await _wallService.DeleteWall(id);
            return Ok(response);
        }

        //Implement function for the "request page". Allows users to report that a new wall has been created; and send in a form with the data for it. 


    }
}
