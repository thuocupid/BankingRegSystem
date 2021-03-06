// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using bankApi.Models;

#nullable disable

namespace bankApi.Migrations
{
    [DbContext(typeof(BankAppContext))]
    [Migration("20220610101924_Transctions")]
    partial class Transctions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("bankApi.Models.BankModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DateOfBirth")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("NextofKin")
                        .HasColumnType("text");

                    b.Property<string>("Office")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("BankModels");
                });

            modelBuilder.Entity("bankApi.Models.Transactions", b =>
                {
                    b.Property<int>("clientId")
                        .HasColumnType("integer");

                    b.Property<int>("AccBalance")
                        .HasColumnType("integer");

                    b.HasKey("clientId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("bankApi.Models.Transactions", b =>
                {
                    b.HasOne("bankApi.Models.BankModel", "BankModel")
                        .WithOne("Transactions")
                        .HasForeignKey("bankApi.Models.Transactions", "clientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BankModel");
                });

            modelBuilder.Entity("bankApi.Models.BankModel", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
