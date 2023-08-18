﻿// <auto-generated />
using System;
using HighStreetGym.Core.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    [DbContext(typeof(HighStreetGymDbContext))]
    [Migration("20230815082522_init4")]
    partial class init4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HighStreetGym.Domain.Activity", b =>
                {
                    b.Property<int>("activity_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("activity_id"));

                    b.Property<string>("activity_description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("activity_duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("activity_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("activity_id");

                    b.ToTable("activity");
                });

            modelBuilder.Entity("HighStreetGym.Domain.BlogPost", b =>
                {
                    b.Property<int>("post_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("post_id"));

                    b.Property<string>("post_content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("post_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("post_time")
                        .HasColumnType("datetime2");

                    b.Property<string>("post_title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("post_user_id")
                        .HasColumnType("int");

                    b.HasKey("post_id");

                    b.HasIndex("post_user_id");

                    b.ToTable("blogPost");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Booking", b =>
                {
                    b.Property<int>("booking_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("booking_id"));

                    b.Property<int>("booking_class_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("booking_created_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("booking_created_time")
                        .HasColumnType("datetime2");

                    b.Property<int>("booking_user_id")
                        .HasColumnType("int");

                    b.HasKey("booking_id");

                    b.HasIndex("booking_class_id")
                        .IsUnique();

                    b.HasIndex("booking_user_id");

                    b.ToTable("booking");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Class", b =>
                {
                    b.Property<int>("class_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("class_id"));

                    b.Property<int>("class_activity_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("class_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("class_room_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("class_time")
                        .HasColumnType("datetime2");

                    b.Property<int>("class_trainer_user_id")
                        .HasColumnType("int");

                    b.HasKey("class_id");

                    b.HasIndex("class_activity_id");

                    b.HasIndex("class_room_id");

                    b.HasIndex("class_trainer_user_id");

                    b.ToTable("classes");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Room", b =>
                {
                    b.Property<int>("room_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("room_id"));

                    b.Property<string>("room_location")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("nvarchar(45)");

                    b.Property<int>("room_number")
                        .HasColumnType("int");

                    b.HasKey("room_id");

                    b.ToTable("room");
                });

            modelBuilder.Entity("HighStreetGym.Domain.User", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("user_id"));

                    b.Property<string>("user_access_role")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("nvarchar(45)");

                    b.Property<string>("user_address")
                        .IsRequired()
                        .HasMaxLength(65)
                        .HasColumnType("nvarchar(65)");

                    b.Property<string>("user_authentication_key")
                        .IsRequired()
                        .HasMaxLength(145)
                        .HasColumnType("nvarchar(145)");

                    b.Property<string>("user_email")
                        .IsRequired()
                        .HasMaxLength(95)
                        .HasColumnType("nvarchar(95)");

                    b.Property<string>("user_first_name")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("nvarchar(45)");

                    b.Property<string>("user_last_name")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("nvarchar(45)");

                    b.Property<string>("user_password")
                        .IsRequired()
                        .HasMaxLength(195)
                        .HasColumnType("nvarchar(195)");

                    b.Property<string>("user_phone")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("nvarchar(45)");

                    b.HasKey("user_id");

                    b.ToTable("user");
                });

            modelBuilder.Entity("HighStreetGym.Domain.BlogPost", b =>
                {
                    b.HasOne("HighStreetGym.Domain.User", "User")
                        .WithMany("BlogPosts")
                        .HasForeignKey("post_user_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Booking", b =>
                {
                    b.HasOne("HighStreetGym.Domain.Class", "Class")
                        .WithOne("Booking")
                        .HasForeignKey("HighStreetGym.Domain.Booking", "booking_class_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("HighStreetGym.Domain.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("booking_user_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Class", b =>
                {
                    b.HasOne("HighStreetGym.Domain.Activity", "Activity")
                        .WithMany("Classes")
                        .HasForeignKey("class_activity_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("HighStreetGym.Domain.Room", "Room")
                        .WithMany("Classes")
                        .HasForeignKey("class_room_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("HighStreetGym.Domain.User", "User")
                        .WithMany("Classes")
                        .HasForeignKey("class_trainer_user_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Activity");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Activity", b =>
                {
                    b.Navigation("Classes");
                });

            modelBuilder.Entity("HighStreetGym.Domain.Class", b =>
                {
                    b.Navigation("Booking")
                        .IsRequired();
                });

            modelBuilder.Entity("HighStreetGym.Domain.Room", b =>
                {
                    b.Navigation("Classes");
                });

            modelBuilder.Entity("HighStreetGym.Domain.User", b =>
                {
                    b.Navigation("BlogPosts");

                    b.Navigation("Bookings");

                    b.Navigation("Classes");
                });
#pragma warning restore 612, 618
        }
    }
}
