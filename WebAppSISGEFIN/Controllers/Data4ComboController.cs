using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAppSISGEFIN.Models;

namespace WebAppSISGEFIN.Controllers
{
    public class Data4ComboController : Controller
    {

        [HttpGet]
        public string GetGrupos()
        {
            string _data = "vGruposPA|IdGrupo|NombreGrupo|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetClases(string idGrupo)
        {
            string _data = $"vClasesPA|IdClase|NombreClase|IdGrupo='{idGrupo}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetFamilias(string idGrupo, string idClase)
        {
            string _data = $"vFamiliasPA|IdFamilia|NombreFamilia|IdGrupo='{idGrupo}' And IdClase='{idClase}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetOficinas()
        {
            string _data = "vOficinasPA|IdOficina|NombreOficina|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetUbicaciones(string idOficina)
        {
            string _data = $"vUbicacionesPA|IdUbicacion|NombreUbicacion|IdOficina='{idOficina}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetReponsables()
        {
            string _data = "vProveedoresPA|IdProveedor|NombreProveedor|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetFuentesFinan()
        {
            string _data = "vFuentesFinan|IdFuente|NombreFuente|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetEntidades()
        {
            string _data = "M_ENTIDAD|ENTI_SECUENCIA|ENTI_NOMBRE|DEST_SECUENCIA=1";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        public string GetTiposNota()
        {
            string _data = "vTiposNotasMod|IdTipoNota|NombreTipoNota|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

    }

}