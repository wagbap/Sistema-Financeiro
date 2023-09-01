using AutoMapper;
using System.Collections.Generic;
using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Helpers;
using WebAPI_CRUD.Models;

namespace WebAPI_CRUD.Services
{
    public class ItemService : IItemService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ItemService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Items> GetAll()
        {
            return _context.Items.ToList();
        }

        public void Create(ItemRequest model)
        {
            var item = _mapper.Map<Items>(model);
            _context.Items.Add(item);
            _context.SaveChanges();
        }
    }
}
