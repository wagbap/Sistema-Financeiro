﻿namespace WebAPI_CRUD.Models.Items
{
    public class ItemRequest
    {
        public DateTime date { get; set; }
        public string category { get; set; }
        public string title { get; set; }
        public double value { get; set; }
        public string status  { get; set; }
    }

}
