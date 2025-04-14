public class Cuidado
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
    public required string Frequencia { get; set; } // Pode ser "Diária", "Semanal", "Mensal", etc.
}
