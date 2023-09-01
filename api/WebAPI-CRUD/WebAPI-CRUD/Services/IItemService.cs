using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Models;

namespace WebAPI_CRUD.Services
{


    public interface IItemService
    {
        IEnumerable<Items> GetAll();
        void Create(ItemRequest model);
        // outros métodos que você desejar...
    }

}
