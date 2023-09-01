using AutoMapper;
using System.Collections.Generic;
using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Helpers;
using WebAPI_CRUD.Models.Items;

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

        public Items GetById(int id)
        {
            return _context.Items.Find(id);
        }


        public void Create(ItemRequest model)
        {
            var item = _mapper.Map<Items>(model);
            _context.Items.Add(item);
            _context.SaveChanges();
        }


        public void Update(int id, UpdateRequest model)
        {
            var item = GetItem(id);

          
          

            _mapper.Map(model, item);

            _context.Items.Update(item);
            _context.SaveChanges();
        }

        private Items GetItem(int id)
        {
            var user = _context.Items.FirstOrDefault(u => u.Id == id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }

    }
}
