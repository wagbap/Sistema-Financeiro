using AutoMapper;
using WebAPI_CRUD.Entities;
using WebAPI_CRUD.Models.Items;

namespace WebAPI_CRUD.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
         

            // ItemRequest -> Item
            CreateMap<ItemRequest, Items>();

            // UpdateRequest -> User
            CreateMap<UpdateRequest, Items>()
                .ForAllMembers(x => x.Condition(
                    (src, dest, prop) =>
                    {
                        // ignore both null & empty string properties
                        if (prop == null) return false;
                        if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                        return true;
                    }
                ));
        }
    }
}
