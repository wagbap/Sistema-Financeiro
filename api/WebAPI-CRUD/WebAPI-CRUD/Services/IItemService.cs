using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Models.Items;

namespace WebAPI_CRUD.Services
{


    public interface IItemService
    {
        IEnumerable<Items> GetAll();
        void Create(ItemRequest model);

        Items GetById(int id);

        void Update(int id, UpdateRequest model);

        void Delete(int id);
    }

}
