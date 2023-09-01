using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI_CRUD.Models;
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
            var items = _itemService.GetAll();
            return Ok(items);
        }

        [HttpPost]
        public IActionResult CreateItem(ItemRequest model)
        {
            _itemService.Create(model);
            return Ok(new { message = "Item created" });
        }
    }

}
