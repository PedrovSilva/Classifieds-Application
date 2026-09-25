using System.ComponentModel.DataAnnotations;

namespace ClassificadosApi.Models
{
    public class Classificado
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; } 
        public  DateTime DataCadastro { get; set; }
     
    }
}
