using AutoMapper;
using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Models;

namespace WebAPI_CRUD.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
         

            // ItemRequest -> Item
            CreateMap<ItemRequest, Items>();

   
        }
    }
}
