namespace teste_dev.api.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public DateTime DataNascimento { get; set; }
        public required string Especie { get; set; }
        public required string Habitat { get; set; }
        public required string PaisOrigem { get; set; }

        // Relacionamento muitos-para-muitos com Cuidados através da tabela de junção AnimalCuidado
        public ICollection<AnimalCuidado> AnimaisCuidados { get; set; } = new List<AnimalCuidado>();
    }
}
