﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Helpers;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230419165129_IsAdmin")]
    partial class IsAdmin
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("climber_api.Models.Wall", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Anchor")
                        .HasColumnType("int");

                    b.Property<int>("Color")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Grade")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("RatingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("Removed")
                        .HasColumnType("datetime2");

                    b.Property<string>("TypesJSON")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RatingId");

                    b.ToTable("Walls");
                });

            modelBuilder.Entity("WebApi.Entities.Rating", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("WebApi.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateJoined")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<bool>("IsBuilder")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Entities.UserRating", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("AuthorId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.Property<Guid?>("RatingId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("RatingId");

                    b.ToTable("UserRating");
                });

            modelBuilder.Entity("climber_api.Models.Wall", b =>
                {
                    b.HasOne("WebApi.Entities.Rating", "Rating")
                        .WithMany()
                        .HasForeignKey("RatingId");

                    b.Navigation("Rating");
                });

            modelBuilder.Entity("WebApi.Entities.UserRating", b =>
                {
                    b.HasOne("WebApi.Entities.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("WebApi.Entities.Rating", null)
                        .WithMany("UserRatings")
                        .HasForeignKey("RatingId");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("WebApi.Entities.Rating", b =>
                {
                    b.Navigation("UserRatings");
                });
#pragma warning restore 612, 618
        }
    }
}
