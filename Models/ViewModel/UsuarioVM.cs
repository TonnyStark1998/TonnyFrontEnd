using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TonnyFrontEnd.Models.ViewModel
{
    public class UsuarioVM
    {
        [Required(ErrorMessage ="Escriba su usuario")]
        public string Nombre { get; set; }
        [Required(ErrorMessage ="Escriba su contraseña")]
        public string Clave { get; set; }
        [Required(ErrorMessage = "Escriba su Nombre")]
        public string NombreCrear { get; set; }
        [Required(ErrorMessage = "Escriba su Apellido Paterno")]
        public string APaterno { get; set; }
        [Required(ErrorMessage = "Escriba su Apellido Materno")]
        public string AMaterno { get; set; }
        [Required(ErrorMessage = "Escriba su RFC")]
        public string RFC { get; set; }
        [Required(ErrorMessage = "Escriba su Fecha Nacimiento")]
        public string FNacimiento { get; set; }


        [Required(ErrorMessage = "Escriba su Nombre")]
        public string NombreAct { get; set; }
        [Required(ErrorMessage = "Escriba su Apellido Paterno")]
        public string APaternoAct { get; set; }
        [Required(ErrorMessage = "Escriba su Apellido Materno")]
        public string AMaternoAct { get; set; }
        [Required(ErrorMessage = "Escriba su RFC")]
        public string RFCAct { get; set; }
        [Required(ErrorMessage = "Escriba su Fecha Nacimiento")]
        public string FNacimientoAct { get; set; }


        [Required(ErrorMessage = "Escriba su Nombre")]
        public string NombreCon { get; set; }
        [Required(ErrorMessage = "Escriba su Nombre")]
        public string NombreEli { get; set; }
        //[Required(ErrorMessage = "Escriba su Apellido Materno")]
        //public string AMaternoCon { get; set; }
        //[Required(ErrorMessage = "Escriba su RFC")]
        //public string RFCCon { get; set; }
        //[Required(ErrorMessage = "Escriba su Fecha Nacimiento")]
        //public string FNacimientoCon { get; set; }
    }
}
