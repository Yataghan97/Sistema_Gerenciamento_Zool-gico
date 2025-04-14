using Microsoft.EntityFrameworkCore;
using teste_dev.api.Models;

namespace teste_dev.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Animal> Animais { get; set; }
        public DbSet<Cuidado> Cuidados { get; set; }
        public DbSet<AnimalCuidado> AnimaisCuidados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configura a chave primária composta da tabela de junção
            modelBuilder.Entity<AnimalCuidado>()
                .HasKey(ac => new { ac.AnimalId, ac.CuidadoId });

            // Configura o relacionamento muitos-para-muitos entre Animal e Cuidado
            modelBuilder.Entity<AnimalCuidado>()
                .HasOne(ac => ac.Animal)
                .WithMany(a => a.AnimaisCuidados)
                .HasForeignKey(ac => ac.AnimalId);

            modelBuilder.Entity<AnimalCuidado>()
                .HasOne(ac => ac.Cuidado)
                .WithMany(c => c.AnimaisCuidados)
                .HasForeignKey(ac => ac.CuidadoId);
        }
    }
}
