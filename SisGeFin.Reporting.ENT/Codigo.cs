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
        public string CodigoRegCta { get; set; }
        public string NombreRegCta { get; set; }
        public string NombreSubCta { get; set; }
        public string NombreCuenta { get; set; }
        public string NombreBalance { get; set; }
        public short NumeroMovim { get; set; }
        public string FechaMovCab { get; set; }
        public string SerieItem { get; set; }
        public string UsuarioItem { get; set; }
        public string NombreMarca { get; set; }
        public string NombreModelo { get; set; }
        public string NomEstConserv { get; set; }
        public string Grupo { get; set; }
        public short CorreMovim { get; set; }
        public string FechaMovDet { get; set; }
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
        public short IdMovimInv { get; set; }
        public short IdMovimCab { get; set; }
        public short IdMovimDet { get; set; }
        public string NombreFamilia { get; set; }
        public string NombreClase { get; set; }
        public string NombreGrupo { get; set; }
        public string NroOc { get; set; }
        public string FechaEmision { get; set; }
        public string FechaMovim { get; set; }
        public string CodigoPatrimon { get; set; }
        public string DescripcionMovim { get; set; }
        public string NombreMarca { get; set; }
        public string NombreModelo { get; set; }
        public string NombreResponCab { get; set; }
        public string NombreResponsable { get; set; }
        public string NombreResponFisica { get; set; }
        public string NombreCompleto { get; set; }
        public string UsuarioItem { get; set; }
        public string NomEstadoC { get; set; }
        public string NomEstadoD { get; set; }
        public string NombreOficina { get; set; }
        public string NombreUbicacion { get; set; }
        public string NomEstConserv { get; set; }
        public string NombreRegCta { get; set; }
        public string NombreSubCta { get; set; }
        public string NombreCuenta { get; set; }
        public string NombreBalance { get; set; }
        public string CausaIngreso { get; set; }
        public string TipoIngreso { get; set; }
        public string SerieItem { get; set; }
        public short MesProceso { get; set; }
        public decimal OcNea { get; set; }
        public string FechaNea { get; set; }
        public string CodigoRegCta { get; set; }
        public short IdEstConserv { get; set; }
        public string IdTipoMovim { get; set; }
        public decimal ValorCompra { get; set; }
        public decimal ValorInicial { get; set; }
        public short IdResponsable { get; set; }
        public short IdResponItem { get; set; }
        public short IdTipoActivo { get; set; }
        public short IdUbicacion { get; set; }
        public short AñoEjecuc { get; set; }
        public short IdEstadoC { get; set; }
        public short IdEstadoD { get; set; }
        public short IdOficina { get; set; }
        public short IdUsuario { get; set; }
        public string IdFamilia { get; set; }
        public string IdClase { get; set; }
        public string IdGrupo { get; set; }
    }

    public class FuenteFinanciamiento
    {
        public short AñoEjecuc { get; set; }
        public short IdFuenteF { get; set; }
        public string NombreFuente { get; set; }
        public string META_CODIGO { get; set; }
        public string META_NOMBRE { get; set; }
        public string SM_CODIGO { get; set; }
        public string SM_NOMBRE { get; set; }
        public string ACTIVI_CODIGO { get; set; }
        public string ACTIVI_NOMBRE { get; set; }
        public string CLASIF_CODIGO { get; set; }
        public string CLASIF_NOMBRE { get; set; }
        public decimal MONTO_PIA { get; set; }
    }


}
