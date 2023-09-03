using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI_CRUD.Models.Items;
using WebAPI_CRUD.Services;

namespace WebAPI_CRUD.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ItemService _itemService;
        private IMapper _mapper;

        public ItemsController(
             IItemService itemService,
             IMapper mapper)
        {
            _itemService = (ItemService?)itemService;
            _mapper = mapper;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var item = _itemService.GetAll();
            return Ok(item);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _itemService.GetById(id);
            return Ok(item);
        }

        [HttpPost]
        public IActionResult CreateItem(ItemRequest model)
        {
            _itemService.Create(model);
            return Ok(new { message = "Item created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequest model)
        {
            _itemService.Update(id, model);
            return Ok(new { message = "User updated" });
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _itemService.Delete(id);
            return Ok(new { message = "User deleted" });
        }
    }

}
