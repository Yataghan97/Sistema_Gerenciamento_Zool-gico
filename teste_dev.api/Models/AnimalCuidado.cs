namespace teste_dev.api.Models
{
    public class AnimalCuidado
    {
        public int AnimalId { get; set; }
        public required Animal Animal { get; set; }

        public int CuidadoId { get; set; }

        
        public required Cuidado Cuidado { get; set; }
    }
}
