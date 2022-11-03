using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SisGeFin.Reporting.ENT
{

    public class ReporteCR
    {
        public short IdReport { get; set; }
        public string TitleRepo { get; set; }
        public string FiterView { get; set; }
        public string SpName { get; set; }
        public string FileName { get; set; }
        public string TypeName { get; set; }
    }

    public class KardexPatrimonio
    {
        public short IdMovimInv { get; set; }
        public string IdPatrimonio { get; set; }
        public string NombrePatrimon { get; set; }
        public string FechaCompra { get; set; }
        public string FechaAlta { get; set; }
        public string IdCtaMayor { get; set; }
        public string NombreCtaMayor { get; set; }
        public string IdSubCtaCon { get; set; }
        public string NombreSubCta { get; set; }
        public short NumeroMovim { get; set; }
        public string FechaMovimCab { get; set; }
        public string SerieItem { get; set; }
        public string UsuarioItem { get; set; }
        public string NombreMarca { get; set; }
        public string NombreModelo { get; set; }
        public string NomEstConserv { get; set; }
        public string S { get; set; }
        public string Grupo { get; set; }
        public short CorreMovim { get; set; }
        public string FechaMovimDet { get; set; }
        public string MotivoMovim { get; set; }
        public string NomTipoMovim { get; set; }
        public string NombreRepara { get; set; }
        public string NomProvOrig { get; set; }
        public string NomUbicOrig { get; set; }
        public string NomOficOrig { get; set; }
        public string NomProvDest { get; set; }
        public string NomUbicDest { get; set; }
        public string NomOficDest { get; set; }
        public string DocumReferen { get; set; }
    }

    public class PatriminioInventario
    {
        public int IdMovimInv { get; set; }
        public int IdMovimCab { get; set; }
        public int IdMovimDet { get; set; }
        public string NombreFamilia { get; set; }
        public string NombreClase { get; set; }
        public string NombreGrupo { get; set; }
        public string NroOc { get; set; }
        public string FechaEmision { get; set; }
        public string FechaMovim { get; set; }
        public string IdCtaMayor { get; set; }
        public string NombreCtaMayor { get; set; }
        public string IdSubCta { get; set; }
        public string NombreSubCta { get; set; }
        public string CuentaContable { get; set; }
        public string CodigoPatrimon { get; set; }
        public string DescripcionMovim { get; set; }
        public string NombreMarca { get; set; }
        public string NombreModelo { get; set; }
        public string NombreResponCab { get; set; }
        public string NombreResponsable { get; set; }
        public string NombreCompleto { get; set; }
        public string UsuarioItem { get; set; }
        public string NomEstadoC { get; set; }
        public string NomEstadoD { get; set; }
        public string NombreOficina { get; set; }
        public string NombreUbicacion { get; set; }
        public string CausaIngreso { get; set; }
        public string TipoIngreso { get; set; }
        public string SerieItem { get; set; }
        public int MesProceso { get; set; }
        public decimal OcNea { get; set; }
        public string FechaNea { get; set; }
        public decimal ValorCompra { get; set; }
        public decimal ValorInicial { get; set; }
        public string IdTipoMovim { get; set; }
        public int IdUbicacion { get; set; }
        public int IdResponsable { get; set; }
        public int IdResponItem { get; set; }
        public int AñoEjecuc { get; set; }
        public int IdEstadoC { get; set; }
        public int IdEstadoD { get; set; }
        public int IdOficina { get; set; }
        public int IdUsuario { get; set; }
        public string IdFamilia { get; set; }
        public string IdClase { get; set; }
        public string IdGrupo { get; set; }
        public string NombreResponFisica { get; set; }
        public string NomEstConserv { get; set; }
        public int IdEstConserv { get; set; }
    }

}
