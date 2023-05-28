using Microsoft.EntityFrameworkCore;

namespace HomeRent.Models
{
    public class BrandContext : DbContext
    {
        public BrandContext(DbContextOptions<BrandContext> options) :base(options)
        {
            
        }
       
        public DbSet<Blok> Blok { get; set; }
        public DbSet<Flat> Flat { get; set; }
        public DbSet<Contract> Contract { get; set; }


    }
}
