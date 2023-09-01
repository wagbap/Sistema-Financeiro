using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebAPI_CRUD.Entities;

namespace WebAPI_CRUD.Helpers
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration, DbContextOptions<DataContext> options)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }

 
        public DbSet<Items> Items { get; set; }
      
        

    }
}

