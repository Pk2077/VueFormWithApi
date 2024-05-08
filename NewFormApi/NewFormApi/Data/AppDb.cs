using Microsoft.EntityFrameworkCore;

namespace NewFormApi.Data
{
    public class AppDb : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public AppDb(DbContextOptions<AppDb> options)
       : base(options)
        {
        }
    }
}
