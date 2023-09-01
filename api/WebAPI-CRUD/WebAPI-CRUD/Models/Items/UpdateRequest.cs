using System.ComponentModel.DataAnnotations;

namespace WebAPI_CRUD.Models.Items
{
    public class UpdateRequest
    {
         public int Telefone { get; set; }

        public DateTime date { get; set; }
        public string category { get; set; }
        public string title { get; set; }
        public double value { get; set; }

        private string replaceEmptyWithNull(string value)
        {
            return string.IsNullOrEmpty(value) ? null : value;
        }
    }
}
