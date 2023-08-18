using System.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HighStreetGym.Domain;
using Microsoft.Extensions.Configuration;

namespace HighStreetGym.Core.Core
{
    public class HighStreetGymDbContext : DbContext
    {
        public DbSet<HighStreetGym.Domain.Activity> activity { get; set; }
        public DbSet<BlogPost> blogPost { get; set; }
        public DbSet<Booking> booking { get; set; }
        public DbSet<Class> classes { get; set; }
        public DbSet<Room> room { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<BookingClass> bookingClass { get; set; }

        public HighStreetGymDbContext(DbContextOptions<HighStreetGymDbContext> options) : base(options)
        {

        }

        protected HighStreetGymDbContext()
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.NoAction;
            }
            modelBuilder.Entity<User>()
                .HasIndex(u => u.user_email)
                .IsUnique();

            modelBuilder.Entity<BlogPost>()
                .HasOne(b => b.User)
                .WithMany(u => u.BlogPosts)
                .HasForeignKey(b => b.post_user_id)
                .HasPrincipalKey(u => u.user_id)
                .OnDelete(DeleteBehavior.NoAction);

            // modelBuilder.Entity<Booking>()
            //     .HasOne(b => b.Class)
            //     .WithOne(c => c.Booking)
            //     .HasForeignKey<Booking>(b => b.booking_class_id)
            //     .HasPrincipalKey<Class>(c => c.class_id)
            //     .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<BookingClass>()
                .HasKey(bc => new { bc.BookingId, bc.ClassId }); // 设置复合主键

            modelBuilder.Entity<BookingClass>()
                .HasOne(bc => bc.Booking)
                .WithMany(b => b.BookingClasses)
                .HasForeignKey(bc => bc.BookingId);

            modelBuilder.Entity<BookingClass>()
                .HasOne(bc => bc.Class)
                .WithMany(c => c.BookingClasses)
                .HasForeignKey(bc => bc.ClassId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.booking_user_id)
                .HasPrincipalKey(u => u.user_id)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Class>()
                .HasOne(c => c.Activity)
                .WithMany(a => a.Classes)
                .HasForeignKey(c => c.class_activity_id)
                .HasPrincipalKey(a => a.activity_id)
                .OnDelete(DeleteBehavior.NoAction); // Add this line

            // Class and Room relationship (Many to One)
            modelBuilder.Entity<Class>()
                .HasOne(c => c.Room)
                .WithMany(r => r.Classes)
                .HasForeignKey(c => c.class_room_id)
                .HasPrincipalKey(a => a.room_id)
                .OnDelete(DeleteBehavior.NoAction); // Add this line


            modelBuilder.Entity<Class>()
                .HasOne(c => c.User)
                .WithMany(u => u.Classes)
                .HasForeignKey(c => c.class_trainer_user_id)
                .HasPrincipalKey(u => u.user_id)
                .OnDelete(DeleteBehavior.NoAction); // Add this line
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

    }
}