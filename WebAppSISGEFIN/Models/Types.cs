using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAppSISGEFIN.Models
{

    public class rMensaje
    {
        public string Type { get; set; }
        public string Image { get; set; }
        public string Message { get; set; }
    }

    public class rElemCbo
    {
        public string Codigo { get; set; }
        public string Descrp { get; set; }        
    }

    public class xResponse<T>
    {
        public bool IsOk { get; set; }
        public string Message { get; set; }
        public T Content { get; set; }
        public byte Code { get; set; }
    }

    public partial class rInv1
    {
        public int Id_Movim_Inv { get; set; }
        public int Id_Movim_Cab { get; set; }
        public int Id_Movim_Det { get; set; }
        public string Nombre_Mayor { get; set; }
        public string Nombre_SubCta { get; set; }
        public string Cuenta_Contable { get; set; }
        public string Codigo_Patrimon { get; set; }
        public string DescripcionMovim { get; set; }
        public string DescripcionMarca { get; set; }
        public string DescripcionModelo { get; set; }
        public string NombreResponsable { get; set; }
        public decimal OC_NEA { get; set; }
        public string FECHA_EA { get; set; }
        public decimal Valor_Compra { get; set; }
        public decimal Valor_Inicial { get; set; }
    }

    public partial class rInv2
    {
        public int Id_Movim_Inv { get; set; }
        public int Id_Movim_Cab { get; set; }
        public int Id_Movim_Det { get; set; }
        public string Nombre_Mayor { get; set; }
        public string Nombre_SubCta { get; set; }
        public string Cuenta_Contable { get; set; }
        public string Codigo_Patrimon { get; set; }
        public string DescripcionMovim { get; set; }
        public string DescripcionMarca { get; set; }
        public string DescripcionModelo { get; set; }
        public string NombreResponsable { get; set; }
        public string FECHA_OC { get; set; }
        public string FECH_MOVIM { get; set; }
        public string NRO_OC { get; set; }
        public string TipoIngreso { get; set; }
        public string CausaIngreso { get; set; }
        public string NombreCompleto { get; set; }
        public string UbicaciónFísica { get; set; }
        public decimal OC_NEA { get; set; }
        public string FECHA_EA { get; set; }
        public int MES_PROCESO { get; set; }
        public decimal Valor_Compra { get; set; }
        public decimal Valor_Inicial { get; set; }

    }

}