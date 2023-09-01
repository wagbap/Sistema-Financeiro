using System.Text.Json.Serialization;

namespace WebAPI_CRUD.Entities
{
    public class Items      
    {

      
        public int Id { get; set; }
        public DateTime date { get; set; }
        public string category { get; set; }
        public string title { get; set; }
        public double value { get; set; }
    }
}
