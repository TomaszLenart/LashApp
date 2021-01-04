using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LashApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LashApp.Data.Db
{
    public class AppDbContext : DbContext
    {
        #region Constructor
        public AppDbContext() : base()
        {

        }
        public AppDbContext(DbContextOptions options)
        : base(options)
        {
        }
        #endregion Constructor
        #region Methods
        protected override void OnModelCreating(ModelBuilder
            modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Map Entity names to DB Table names
            modelBuilder.Entity<Client>().ToTable("Clients");
            modelBuilder.Entity<Worker>().ToTable("Workers");
            modelBuilder.Entity<Location>().ToTable("Locations");
            modelBuilder.Entity<Treatment>().ToTable("Treatments");
            modelBuilder.Entity<Appointment>().ToTable("Appointments");


        }
        #endregion Methods
        #region Properties
        public DbSet<Client> Clients { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        #endregion Properties
    }


}
