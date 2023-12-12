namespace WebApi.Helpers;

using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Entities.Enums;
using WebApi.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<DataContext>();
            var connectionString = configuration.GetConnectionString("WebApiDatabase");
            builder.UseSqlServer(connectionString, o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        }
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Wall> Walls { get; set; }
    public DbSet<UserRating> RateComments { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<UserRating> UserRatings { get; set; }
    public DbSet<UserWallProgress> ProgressLists { get; set; }
}